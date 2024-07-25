import { Box, Fab, Typography } from "@mui/material";
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

  // Sort between completed and uncompleted shopping lists
  const completedLists = shoppingLists.filter((list) => list.completed);
  const uncompletedLists = shoppingLists.filter((list) => !list.completed);

  return (
    <Box component="div">
      <ShoppingListHeader />
      <Box component="div" sx={{ maxWidth: "600px" }}>
        <div className="mb-4">
          <Typography variant="h5">Active</Typography>
          {uncompletedLists.length > 0 ? (
            <ShoppingListList items={uncompletedLists} />
          ) : (
            <Typography variant="body1">No active lists</Typography>
          )}
        </div>

        {completedLists.length > 0 && (
          <>
            <Typography variant="h5">Older</Typography>
            <ShoppingListList items={completedLists} />
          </>
        )}
      </Box>
    </Box>
  );
}
