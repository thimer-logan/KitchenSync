import ShoppingListForm from "@/components/shopping-list/form/ShoppingListForm";
import { getShoppingList, getStorageItems } from "@/lib/db";
import { createClient } from "@/utils/supabase/server";
import React from "react";

const getData = async (shoppingListId: string) => {
  const supabase = createClient();
  const storagePromise = getStorageItems(supabase);
  const shoppingListPromise = getShoppingList(supabase, shoppingListId);

  const [storageResult, shoppingListResult] = await Promise.all([
    storagePromise,
    shoppingListPromise,
  ]);

  const { items, error } = storageResult;
  const { shoppingList, error: shopError } = shoppingListResult;

  const combinedError = error || shopError;

  return { items, shoppingList, error: combinedError };
};

export default async function EditShoppingListPage({
  params,
}: {
  params: { id: string };
}) {
  const { items, shoppingList, error } = await getData(params.id);

  if (error || !shoppingList) {
    console.error("Error fetching data:", error);
    return <div>Error fetching data</div>;
  }

  return <ShoppingListForm storageItems={items} defaultValues={shoppingList} />;
}
