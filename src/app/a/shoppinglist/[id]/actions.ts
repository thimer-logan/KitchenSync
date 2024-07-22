"use server";

import { saveShoppingListItems } from "@/lib/db";
import { ShoppingListItem } from "@/types/shopping-list";
import { createClient } from "@/utils/supabase/server";

export async function saveItems(items: ShoppingListItem[]) {
  // Save the items to the server
  const supabase = createClient();
  const newItems = items.map((item) => {
    return {
      id: item.id,
      quantity_purchased: item.quantityPurchased,
      is_purchased: item.isPurchased,
      shopping_list_id: item.shoppingListId,
      storage_item_id: item.storageItem.id,
    };
  });

  const { data, error } = await saveShoppingListItems(supabase, newItems);

  if (error) {
    console.error(error);
  }
}
