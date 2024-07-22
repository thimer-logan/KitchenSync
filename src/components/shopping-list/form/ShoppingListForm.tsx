"use client";

import {
  createShoppingList,
  updateShoppingList,
} from "@/app/a/shoppinglist/actions";
import { ShoppingList, Store } from "@/types/shopping-list";
import { StorageItem } from "@/types/storage";
import {
  Autocomplete,
  Box,
  Checkbox,
  darken,
  Grid,
  lighten,
  styled,
  TextField,
} from "@mui/material";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import React, { useState } from "react";
import SubmitButton from "../../buttons/SubmitButton";
import StorageItemListItem from "./StorageItemListItem";
import StoreSelect from "./StoreSelect";
import { stores } from "@/constants/storeImageMapping";

const GroupHeader = styled("div")(({ theme }) => ({
  position: "sticky",
  top: "-8px",
  padding: "4px 10px",
  color: theme.palette.primary.main,
  backgroundColor:
    theme.palette.mode === "light"
      ? lighten(theme.palette.primary.light, 0.85)
      : darken(theme.palette.primary.main, 0.8),
}));

const GroupItems = styled("ul")({
  padding: 0,
});

// This function is used to get the initial items for the form
const getInitialItems = (
  storageItems: StorageItem[],
  defaultValues?: ShoppingList
) => {
  if (!defaultValues?.items) {
    return [];
  }

  const selectedIds = defaultValues.items.map((item) => item.storageItem.id);
  return storageItems.filter((item) => selectedIds.includes(item.id));
};

const getStoreFromString = (store?: string) => {
  if (!store) {
    return undefined;
  }

  if (typeof store === "string") {
    // find the store object from the stores array
    return stores.find((s) => s.name === store);
  }
};

interface ShoppingListFormProps {
  storageItems: StorageItem[];
  defaultValues?: ShoppingList;
}

export default function ShoppingListForm({
  storageItems,
  defaultValues,
}: ShoppingListFormProps) {
  const [selectedItems, setSelectedItems] = useState<StorageItem[]>(
    getInitialItems(storageItems, defaultValues)
  );
  const [store, setStore] = useState<Store | undefined>(
    getStoreFromString(defaultValues?.store)
  );

  // initialize quantity field with quantity purchased from defaultValues
  storageItems.forEach((item) => {
    if (defaultValues?.items) {
      const defaultItem = defaultValues.items.find(
        (i) => i.storageItem.id === item.id
      );
      if (defaultItem) {
        item.quantity = defaultItem.quantityPurchased;
      }
    }
  });

  const submissionAction =
    defaultValues && defaultValues.id
      ? updateShoppingList.bind(null, defaultValues.id)
      : createShoppingList;

  const sortedItems = storageItems
    .map((item) => {
      return {
        ...item,
        category: item.category || "Other",
      };
    })
    .sort((a, b) => {
      return a.category.localeCompare(b.category);
    });

  const handleItemChange = (
    _event: React.SyntheticEvent,
    value: StorageItem[],
    _reason: string
  ) => {
    setSelectedItems(value);
  };

  const handleItemQuantityChange = (id: string, quantity: number) => {
    setSelectedItems((items) =>
      items.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const handleStoreChange = (store: Store) => {
    setStore(store);
  };

  const submitHandler = (formData: FormData) => {
    const items = selectedItems.map((item) => {
      return {
        id: defaultValues?.items.find((i) => i.storageItem.id === item.id)?.id,
        storageItem: item.id,
        quantityPurchased: item.quantity || 0,
        isPurchased: false,
      };
    });
    formData.set("items", JSON.stringify(items));
    formData.set("store", store?.name || "");
    return submissionAction(formData);
  };

  return (
    <Box
      component="form"
      action={submitHandler}
      sx={{
        display: "flex",
        flexDirection: "column",
        m: 3,
        // "& .MuiTextField-root": { m: 1 },
        // "& .MuiButton-root": { m: 1 },
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            id="shoppinglist-name"
            label="Name"
            name="name"
            defaultValue={defaultValues?.name || ""}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <StoreSelect
            stores={stores}
            value={store}
            onChange={handleStoreChange}
          />
        </Grid>
        <Grid item xs={12}>
          <Autocomplete
            id="shoppinglist-items"
            multiple
            disableCloseOnSelect
            limitTags={2}
            options={sortedItems}
            groupBy={(option) => option.category}
            getOptionLabel={(option) => option.name}
            value={selectedItems}
            renderInput={(params) => <TextField {...params} label="Items" />}
            renderGroup={(params) => (
              <li key={params.key}>
                <GroupHeader>{params.group}</GroupHeader>
                <GroupItems>{params.children}</GroupItems>
              </li>
            )}
            renderOption={(props, option, { selected }) => (
              <li {...props}>
                <Checkbox
                  icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                  checkedIcon={<CheckBoxIcon fontSize="small" />}
                  style={{ marginRight: 8 }}
                  checked={selected}
                />
                {option.name}
              </li>
            )}
            onChange={handleItemChange}
            isOptionEqualToValue={(option, value) => option.id === value.id}
          />
        </Grid>
        <Grid item xs={12}>
          <ul className="list-none m-0 p-0 overflow-auto">
            {selectedItems.map((item) => (
              <StorageItemListItem
                key={item.id}
                storageItem={item}
                onQuantityChange={(num) =>
                  handleItemQuantityChange(item.id, num)
                }
              />
            ))}
          </ul>
        </Grid>
        <Grid item xs={12} sx={{ display: "flex", flexDirection: "column" }}>
          <SubmitButton
            text="Save"
            sx={{ width: "100px", alignSelf: "center" }}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
