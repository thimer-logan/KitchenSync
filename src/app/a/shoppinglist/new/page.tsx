import ShoppingListForm from "@/components/shopping-list/form/ShoppingListForm";
import { getStorageItems } from "@/lib/db";
import { createClient } from "@/utils/supabase/server";
import React from "react";

export default async function NewShoppingListPage() {
  const supabase = createClient();
  const data = await getStorageItems(supabase);

  return <ShoppingListForm storageItems={data.items} />;
}
