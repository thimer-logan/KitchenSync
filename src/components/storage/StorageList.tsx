import { StorageItem } from "@/types/storage";
import { List, Typography } from "@mui/material";
import React from "react";
import StorageListItem from "./StorageListItem";

interface IngredientListProps {
  items: StorageItem[];
  sortBy?: string; //"name" | "brand" | "category" | "quantity";
}

export default function StorageList({ items, sortBy }: IngredientListProps) {
  let sortedItems = items;
  if (sortBy) {
    sortedItems = items.sort((a, b) => {
      if (sortBy === "name") {
        return a.name.localeCompare(b.name);
      } else if (sortBy === "brand") {
        return (a?.brand ?? "").localeCompare(b?.brand ?? "");
      } else if (sortBy === "quantity") {
        return a.quantity - b.quantity;
      } else if (sortBy === "category") {
        return a.category.localeCompare(b.category);
      }
      return 0;
    });
  }

  const renderList = () => {
    if (sortBy !== "category" && sortBy !== "brand") {
      return sortedItems.map((item) => (
        <StorageListItem key={item.id} item={item} />
      ));
    }

    const groupMap = new Map<string, StorageItem[]>();
    sortedItems.forEach((item) => {
      let groupKey = item.category || "Other";
      if (sortBy === "brand") {
        groupKey = item.brand || "Other";
      }

      if (groupMap.has(groupKey)) {
        groupMap.get(groupKey)?.push(item);
      } else {
        groupMap.set(groupKey, [item]);
      }
    });

    const groupList = Array.from(groupMap.keys()).sort();
    return groupList.map((category) => (
      <React.Fragment key={category}>
        <Typography variant="h6">{category}</Typography>
        {groupMap.get(category)?.map((item) => (
          <StorageListItem key={item.id} item={item} />
        ))}
      </React.Fragment>
    ));
  };

  return <List>{renderList()}</List>;
}
