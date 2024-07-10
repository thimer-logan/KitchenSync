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
  const { data, error } = await supabase.from("shopping_lists").select("*");
  const shoppingLists: ShoppingList[] = data || [];
  return { shoppingLists, error };
}

export async function getShoppingList(supabase: SupabaseClient, id: string) {
  const { data, error } = await supabase
    .from("shopping_lists")
    .select("*")
    .eq("id", id);

  const shoppingList: ShoppingList = data?.[0];

  return { shoppingList, error };
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
