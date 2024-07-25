import { ShoppingList, ShoppingListItem } from "@/types/shopping-list";
import { StorageItem } from "@/types/storage";
import { groupShoppingListItemsByStorageItem } from "@/utils/utils";
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
  const { data, error } = await supabase
    .from("categories")
    .select("name")
    .order("name");

  const ingredientCategories: string[] =
    data?.map((item: { name: any }) => item.name) || [];

  return { ingredientCategories, error };
}

export async function getShoppingLists(supabase: SupabaseClient) {
  // Fetch shopping lists and perform inner join with shopping_list_items and storage tables
  const { data, error } = await supabase
    .from("shopping_lists")
    .select(
      `
      *,
      items:shopping_list_items(*, storageItem:storage(*))
    `
    )
    .order("created_at", { ascending: false });

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
      items:shopping_list_items(*, storageItem:storage(*))
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
      quantityPurchased: item.quantity_purchased,
      isPurchased: item.is_purchased,
      shoppingListId: item.shopping_list_id,
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
    .select("*, storageItem:storage(*)")
    .eq("shopping_list_id", id);

  if (error) {
    console.error("Error fetching shopping list items:", error);
    return { shoppingListItems: null, error };
  }

  const shoppingListItems: ShoppingListItem[] = data.map((item: any) => {
    return {
      id: item.id,
      created_at: item.created_at,
      quantityPurchased: item.quantity_purchased,
      isPurchased: item.is_purchased,
      shoppingListId: item.shopping_list_id,
      storageItem: item.storageItem, // Include the full StorageItem object
    };
  });

  return { shoppingListItems, error };
}

export async function getAllShoppingListItems(supabase: SupabaseClient) {
  const { data, error } = await supabase
    .from("shopping_list_items")
    .select("*, storageItem:storage(*)");

  if (error) {
    console.error("Error fetching shopping list items:", error);
    return { shoppingListItems: null, error };
  }

  const shoppingListItems: ShoppingListItem[] = data.map((item: any) => {
    return {
      id: item.id,
      created_at: item.created_at,
      quantityPurchased: item.quantity_purchased,
      isPurchased: item.is_purchased,
      shoppingListId: item.shopping_list_id,
      storageItem: item.storageItem, // Include the full StorageItem object
    };
  });

  return { shoppingListItems, error };
}

/**
 * Generates a shopping list
 *
 * @export
 * @async
 * @returns {Promise<void>}
 */
export async function generateShoppingListItems(
  supabase: SupabaseClient,
  shoppingListId: string
): Promise<void> {
  const { items, error } = await getStorageItems(supabase);

  if (error) {
    console.log(error);
    return;
  }

  const lowStockItems = items.filter((item) => item.quantity <= 0);

  // Get all previous shopping list items
  const { shoppingListItems, error: shopListItemsError } =
    await getAllShoppingListItems(supabase);

  if (shopListItemsError) {
    console.log(shopListItemsError);
    return;
  }

  // Group the shopping list items by storage item id
  const groupedItems = groupShoppingListItemsByStorageItem(shoppingListItems);

  const shoppingListItemsToCreate: any[] = [];
  lowStockItems.forEach((item) => {
    const shoppingListItem = {
      storage_item_id: item.id,
      quantity_purchased: groupedItems[item.id]?.length
        ? groupedItems[item.id][0].quantityPurchased
        : 1,
      is_purchased: false,
      shopping_list_id: shoppingListId,
    };

    shoppingListItemsToCreate.push(shoppingListItem);
  });

  // Save the shopping list items
  const { error: saveError } = await saveShoppingListItems(
    supabase,
    shoppingListItemsToCreate
  );

  if (saveError) {
    console.log(saveError);
    return;
  }

  // Filter out low stock items
  // const lowStockItemIds = new Set(lowStockItems.map((item) => item.id));
  // const filteredItems = Object.keys(groupedItems)
  //   .filter((key) => !lowStockItemIds.has(key))
  //   .reduce((acc, key) => {
  //     acc[key] = groupedItems[key];
  //     return acc;
  //   }, {} as Record<string, ShoppingListItem[]>);
}

export async function saveShoppingListItems(
  supabase: SupabaseClient,
  items: any[]
) {
  const { data, error } = await supabase
    .from("shopping_list_items")
    .upsert(items);

  return { data, error };
}

export async function getMostFrequentStore(supabase: SupabaseClient) {
  const { data, error } = await supabase.rpc("get_most_popular_store");
  console.log("MPS", data);

  return { store: data, error };
}
