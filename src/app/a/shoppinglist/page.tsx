import { Box, Fab } from "@mui/material";
import React from "react";
import ShoppingListHeader from "./ShoppingListHeader";
import ShoppingListList from "@/components/shopping-list/ShoppingListList";
import { createClient } from "@/utils/supabase/server";
import { getShoppingLists } from "@/lib/db";

async function getData() {
  const supabase = createClient();
  const { shoppingLists, error } = await getShoppingLists(supabase);

  return { shoppingLists, error };
}

export default async function ShoppingListPage() {
  const { shoppingLists, error } = await getData();

  if (error || !shoppingLists) {
    console.error(error);
    return <div>Error loading shopping lists</div>;
  }

  return (
    <Box component="div">
      <ShoppingListHeader />
      <Box component="div" sx={{ maxWidth: "600px" }}>
        <ShoppingListList items={shoppingLists} />
      </Box>
      {/* <Fab
        color="primary"
        aria-label="add"
        sx={{ position: "fixed", bottom: 8, right: 8 }}
      >
        <AddIcon />
      </Fab> */}
    </Box>
  );
}
