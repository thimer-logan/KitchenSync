"use server";

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
    const items: string[] = JSON.parse(data.get("items") as string);
    const itemsData = items.map((item) => ({
      shopping_list_id: resData.id,
      storage_item_id: item,
      //quantity_purchased: 0,
    }));

    console.log(itemsData);

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
): Promise<void> {}

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
  storageItemId?: string
): Promise<void> {}
