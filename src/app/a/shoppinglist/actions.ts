"use server";

import { generateShoppingListItems, getMostFrequentStore } from "@/lib/db";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

/**
 * Creates a shopping list
 *
 * @export
 * @async
 * @param {FormData} data
 * @returns {Promise<void>}
 */
export async function createShoppingList(data: FormData): Promise<void> {
  console.log(...data);

  const shoppingList = {
    name: data.get("name"),
    store: data.get("store"),
  };

  const supabase = createClient();
  const { data: resData, error } = await supabase
    .from("shopping_lists")
    .insert(shoppingList)
    .select()
    .single();

  if (error) {
    console.log(error);
    return;
  }

  // Items are stored in a separate table in the database
  if (data.has("items")) {
    const items = data.get("items") as string;
    const parsedItems: {
      storageItem: string;
      quantityPurchased: number;
      isPurchased: boolean;
    }[] = JSON.parse(items);

    const itemsData = parsedItems.map((item) => ({
      shopping_list_id: resData.id,
      storage_item_id: item.storageItem,
      quantity_purchased: item.quantityPurchased,
      is_purchased: false,
    }));

    await supabase.from("shopping_list_items").insert(itemsData);
  }

  revalidatePath("/a/shoppinglist");
  redirect("/a/shoppinglist");
}

/**
 * Description placeholder
 *
 * @export
 * @async
 * @param {string} id
 * @param {FormData} data
 * @returns {Promise<void>}
 */
export async function updateShoppingList(
  id: string,
  data: FormData
): Promise<void> {
  const shoppingList = {
    name: data.get("name"),
    store: data.get("store"),
  };

  const supabase = createClient();
  const { error } = await supabase
    .from("shopping_lists")
    .update(shoppingList)
    .eq("id", id);

  if (error) {
    console.log(error);
    return;
  }

  // Items are stored in a separate table in the database
  if (data.has("items")) {
    const items = data.get("items") as string;
    const parsedItems: {
      id: string;
      storageItem: string;
      quantityPurchased: number;
      isPurchased: boolean;
    }[] = JSON.parse(items);

    const itemsData = parsedItems.map((item) => ({
      id: item.id,
      shopping_list_id: id,
      storage_item_id: item.storageItem,
      quantity_purchased: item.quantityPurchased,
      is_purchased: false,
    }));

    const { error } = await supabase
      .from("shopping_list_items")
      .upsert(itemsData);
    if (error) {
      console.log(error);
      return;
    }
  }

  revalidatePath("/a/shoppinglist");
  redirect("/a/shoppinglist");
}

/**
 * Description placeholder
 *
 * @export
 * @async
 * @param {FormData} data
 * @param {?string} [storageItemId]
 * @returns {Promise<void>}
 */
export async function addShoppingListItem(
  data: FormData,
  storageItemId: string
): Promise<void> {
  const supabase = createClient();

  // Check if a new shopping list needs to be created
  if (data.has("new-shoppinglist") && data.get("shoppinglist") === "true") {
    const shoppingList = {
      name: data.get("new-shoppinglist"),
      //store: data.get("store"),
    };

    const { data: resData, error } = await supabase
      .from("shopping_lists")
      .insert(shoppingList)
      .select()
      .single();

    if (error) {
      console.log(error);
      return;
    }

    // Update the form data to include the new shopping list ID
    data.set("shoppinglist", resData.id);
  }

  // Create the new shopping list item
  const shoppingListItem = {
    shopping_list_id: data.get("shoppinglist"),
    storage_item_id: storageItemId,
    quantity_purchased: data.get("quantity"),
    is_purchased: false,
  };

  await supabase.from("shopping_list_items").insert(shoppingListItem);

  revalidatePath(`/a/shoppinglist`);
}

export async function generateShoppingList(): Promise<void> {
  const supabase = createClient();
  const { store, error: storeError } = await getMostFrequentStore(supabase);
  const shoppingList = {
    name: "Generated Shopping List",
    store,
  };

  const { data: resData, error } = await supabase
    .from("shopping_lists")
    .insert(shoppingList)
    .select()
    .single();

  if (error) {
    console.log(error);
    return;
  }

  await generateShoppingListItems(supabase, resData.id);

  revalidatePath("/a/shoppinglist");
  redirect(`/a/shoppinglist/${resData.id}/edit`);
}

export async function deleteShoppingList(id: string): Promise<void> {
  const supabase = createClient();
  await supabase.from("shopping_lists").delete().eq("id", id);
  revalidatePath("/a/shoppinglist");
  redirect("/a/shoppinglist");
}

export async function markShoppingListAsComplete(id: string): Promise<void> {
  const supabase = createClient();
  await supabase
    .from("shopping_list_items")
    .update({ is_purchased: true })
    .eq("shopping_list_id", id);

  await supabase.rpc("update_storage_quantities", {
    p_shopping_list_id: id,
  });

  revalidatePath("/a/shoppinglist");
  redirect("/a/shoppinglist");
}
