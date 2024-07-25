"use client";

import { ShoppingListItem } from "@/types/shopping-list";
import { Typography } from "@mui/material";
import React, { useEffect, useState, useTransition } from "react";
import StorageItemListItem from "./StorageItemListItem";
import { useDebouncedCallback } from "use-debounce";

interface ShoppingListItemsProps {
  shoppingListItems: ShoppingListItem[];
  saveItems: (items: ShoppingListItem[]) => Promise<void>;
  disabled?: boolean;
}

export default function ShoppingListItems({
  shoppingListItems,
  saveItems,
  disabled = false,
}: ShoppingListItemsProps) {
  const [items, setItems] = useState(shoppingListItems);
  const [isPending, startTransition] = useTransition();

  const debouncedSaveItems = useDebouncedCallback(
    async (itemsToSave: ShoppingListItem[]) => {
      await saveItems(itemsToSave);
    },
    5000
  ); // Adjust the debounce delay as needed

  // Watch for changes to the items state and debounce the save function
  useEffect(() => {
    if (!disabled) {
      debouncedSaveItems(items);
    }
  }, [items, debouncedSaveItems, disabled]);

  const handleItemQuantityChange = (id: string, quantity: number) => {
    if (disabled) return;

    startTransition(() => {
      setItems((prevItems) =>
        prevItems.map((item) => {
          if (item.id === id) {
            return {
              ...item,
              quantityPurchased: quantity,
            };
          }
          return item;
        })
      );
    });
  };

  const handleItemCheckedChange = (id: string, checked: boolean) => {
    if (disabled) return;

    startTransition(() => {
      setItems((prevItems) =>
        prevItems.map((item) => {
          if (item.id === id) {
            return {
              ...item,
              isPurchased: checked,
            };
          }
          return item;
        })
      );
    });
  };

  const renderList = () => {
    const groupMap = new Map<string, ShoppingListItem[]>();
    items.forEach((item) => {
      let groupKey = item.storageItem.category || "Other";

      if (groupMap.has(groupKey)) {
        groupMap.get(groupKey)?.push(item);
      } else {
        groupMap.set(groupKey, [item]);
      }
    });

    const groupList = Array.from(groupMap.keys()).sort();

    return groupList.map((category) => (
      <React.Fragment key={category}>
        <Typography variant="h6" sx={{ marginTop: 4 }}>
          {category}
        </Typography>
        {groupMap.get(category)?.map((item) => (
          <StorageItemListItem
            key={item.id}
            disabled={disabled}
            storageItem={{
              ...item.storageItem,
              quantity: item.quantityPurchased,
            }}
            onQuantityChange={(num) => handleItemQuantityChange(item.id, num)}
            checkable
            checked={item.isPurchased}
            onCheckedChange={(checked) =>
              handleItemCheckedChange(item.id, checked)
            }
          />
        ))}
      </React.Fragment>
    ));
  };
  return <ul className="list-none m-0 p-0 overflow-auto">{renderList()}</ul>;
}
