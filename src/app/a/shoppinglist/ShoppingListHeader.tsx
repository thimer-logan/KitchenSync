"use client";

import { Box, Button } from "@mui/material";
import Link from "next/link";
import React from "react";
import { generateShoppingList } from "./actions";

export default function ShoppingListHeader() {
  const handleGenerateShoppingList = async () => {
    await generateShoppingList();
  };
  return (
    <Box
      component="div"
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Link href="/a/shoppinglist/new" passHref>
        <Button variant="text" color="primary" component="a">
          Create new list
        </Button>
      </Link>
      <Button
        variant="contained"
        color="primary"
        onClick={handleGenerateShoppingList}
      >
        Generate new list
      </Button>
    </Box>
  );
}
