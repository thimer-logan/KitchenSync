"use client";

import ShoppingListItems from "@/components/shopping-list/ShoppingListItems";
import { ShoppingList, ShoppingListItem } from "@/types/shopping-list";
import { Box, Fab } from "@mui/material";
import React, { useState } from "react";
import { saveItems } from "./actions";
import { Save } from "@mui/icons-material";

interface ShopPageProps {
  shoppingList: ShoppingList;
}

export default function ShopPage({ shoppingList }: ShopPageProps) {
  // const [items, setItems] = useState(shoppingList.items);
  // const handleSave = async () => {
  //   await saveItems(items);
  // };
  // return (
  //   <>
  //     <Box component="div" sx={{ maxWidth: "600px" }}>
  //       <ShoppingListItems items={items} setItems={setItems} />
  //     </Box>
  //     <Fab
  //       color="primary"
  //       aria-label="save"
  //       sx={{ position: "fixed", bottom: 8, right: 8 }}
  //       onClick={handleSave}
  //     >
  //       <Save />
  //     </Fab>
  //   </>
  // );
}
