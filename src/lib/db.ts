import { ShoppingList, ShoppingListItem } from "@/types/shopping-list";
import { StorageItem } from "@/types/storage";
import { SupabaseClient } from "@supabase/supabase-js";

export async function getStorageItems(supabase: SupabaseClient) {
  const { data, error } = await supabase.from("storage").select("*");
  const items: StorageItem[] = data || [];

  return { items, error };
}

export async function getStorageItemsById(
  supabase: SupabaseClient,
  ids: string[]
) {
  const { data, error } = await supabase
    .from("storage")
    .select("*")
    .in("id", ids);
  const items: StorageItem[] = data || [];

  return { items, error };
}

export async function getStorageItem(supabase: SupabaseClient, id: string) {
  const { data, error } = await supabase
    .from("storage")
    .select("*")
    .eq("id", id)
    .single();

  const item: StorageItem = data;

  return { item, error };
}

export async function getStorageItemCategories(supabase: SupabaseClient) {
  const { data, error } = await supabase.from("categories").select("name");

  const ingredientCategories: string[] =
    data?.map((item: { name: any }) => item.name) || [];

  return { ingredientCategories, error };
}

export async function getShoppingLists(supabase: SupabaseClient) {
  // Fetch shopping lists and perform inner join with shopping_list_items and storage tables
  const { data, error } = await supabase.from("shopping_lists").select(`
      *,
      items:shopping_list_items(*, storageItem:storage(*))
    `);

  if (error) {
    console.error("Error fetching shopping lists:", error);
    return { shoppingLists: null, error };
  }

  // Process and return the data
  const shoppingLists: ShoppingList[] = data.map(
    (shoppingList: ShoppingList) => ({
      ...shoppingList,
      items: shoppingList.items.map((item: any) => ({
        id: item.id,
        created_at: item.created_at,
        quantityPurchased: item.quantityPurchased,
        isPurchased: item.isPurchased,
        shoppingListId: item.shoppingListId,
        storageItem: item.storageItem, // Include the full StorageItem object
      })),
    })
  );

  return { shoppingLists, error };
}

export async function getShoppingList(supabase: SupabaseClient, id: string) {
  const { data, error } = await supabase
    .from("shopping_lists")
    .select(
      `
      *,
      items:shopping_list_items(*, storageItem:storage_items(*))
    `
    )
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching shopping list:", error);
    return { shoppingList: null, error };
  }

  // Process and return the data
  const shoppingList: ShoppingList = {
    ...data,
    items: data.items.map((item: any) => ({
      id: item.id,
      created_at: item.created_at,
      quantityPurchased: item.quantityPurchased,
      isPurchased: item.isPurchased,
      shoppingListId: item.shoppingListId,
      storageItem: item.storageItem, // Include the full StorageItem object
    })),
  };

  return { shoppingList, error: null };
}

export async function getShoppingListItems(
  supabase: SupabaseClient,
  id: string
) {
  const { data, error } = await supabase
    .from("shopping_list_items")
    .select("*")
    .eq("shopping_list_id", id);

  return { shoppingListItems: data, error };
}

export async function getAllShoppingListItems(supabase: SupabaseClient) {
  const { data, error } = await supabase
    .from("shopping_list_items")
    .select("*");

  return { shoppingListItems: data, error };
}

/**
 * Generates a shopping list
 *
 * @export
 * @async
 * @returns {Promise<void>}
 */
export async function generateShoppingListItems(
  supabase: SupabaseClient
): Promise<void> {
  const { items, error } = await getStorageItems(supabase);

  if (error) {
    console.log(error);
    return;
  }

  // Filter items that are below the threshold
  const shoppingListItems = items
    .filter((item) => item.quantity <= 0)
    .map((item) => ({
      ...item,
    }));

  const shoppingList = {
    name: "Generated Shopping List",
    store: "Local Store",
  };
}
