import ShoppingListItems from "@/components/shopping-list/form/ShoppingListItems";
import { getShoppingList } from "@/lib/db";
import { createClient } from "@/utils/supabase/server";
import { Box, Typography } from "@mui/material";
import React from "react";
import { saveItems } from "./actions";

async function getData(id: string) {
  const supabase = createClient();
  const { shoppingList, error } = await getShoppingList(supabase, id);

  return { shoppingList, error };
}

export default async function ShoppingListPage({
  params,
}: {
  params: { id: string };
}) {
  const { shoppingList, error } = await getData(params.id);

  if (error || !shoppingList) {
    console.error("Error fetching data:", error);
    return <div>Error fetching data</div>;
  }

  return (
    <Box component="div">
      <Typography variant="h4">{shoppingList?.name}</Typography>
      <Box component="div" sx={{ maxWidth: "600px" }}>
        <ShoppingListItems
          shoppingListItems={shoppingList.items}
          saveItems={saveItems}
          disabled={shoppingList.completed}
        />
      </Box>
    </Box>
  );
}
