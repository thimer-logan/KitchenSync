"use client";

import { ShoppingList } from "@/types/shopping-list";
import { List } from "@mui/material";
import React from "react";
import ShoppingListListItem from "./ShoppingListListItem";

interface ShoppingListListProps {
  items?: ShoppingList[];
}

export default function ShoppingListList({ items }: ShoppingListListProps) {
  return (
    <List>
      {items &&
        items.map((item) => {
          return <ShoppingListListItem key={item.id} shoppingList={item} />;
        })}
    </List>
  );
}
