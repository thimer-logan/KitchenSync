"use client";

import { addShoppingListItem } from "@/app/a/shoppinglist/actions";
import { getShoppingLists, getStorageItem } from "@/lib/db";
import theme from "@/styles/theme";
import { ShoppingList } from "@/types/shopping-list";
import { StorageItem } from "@/types/storage";
import { createClient } from "@/utils/supabase/client";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { PacmanLoader } from "react-spinners";

const getData = async (storageItemId: string) => {
  const supabase = createClient();
  const storagePromise = getStorageItem(supabase, storageItemId);
  const shoppingListPromise = getShoppingLists(supabase);

  const [storageResult, shoppingListResult] = await Promise.all([
    storagePromise,
    shoppingListPromise,
  ]);

  const { item, error } = storageResult;
  const { shoppingLists, error: shopError } = shoppingListResult;

  const combinedError = error || shopError;

  return { item, shoppingLists, error: combinedError };
};

interface AddToShoppingListModalProps {
  id: string;
}

export default function AddToShoppingListModal({
  id,
}: AddToShoppingListModalProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [item, setItem] = useState<StorageItem | null>(null);
  const [shoppingLists, setShoppingLists] = useState<ShoppingList[]>([]);
  const [selectedList, setSelectedList] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getData(id);
        setItem(data.item);

        if (data.shoppingLists) {
          setShoppingLists(data.shoppingLists);
        }
      } catch (error: any) {
        setError(error?.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  });

  const handleClose = () => {
    router.back();
  };

  const handleSelectChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setSelectedList(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    await addShoppingListItem(formData, id);
    handleClose();
  };

  const getDialogContents = () => {
    if (loading) {
      return <PacmanLoader color={theme.palette.primary.main} />;
    }

    if (error) {
      return <DialogContentText>{error}</DialogContentText>;
    }

    return (
      <DialogContent>
        <DialogContentText>
          Select a shopping list to add this item to.
        </DialogContentText>
        <FormControl fullWidth required sx={{ m: "8px" }}>
          <InputLabel id="shoppinglist-label">Shopping List</InputLabel>
          <Select
            labelId="shoppinglist-label"
            id="shoppinglist-select"
            label="Shopping List"
            name="shoppinglist"
            value={selectedList}
            onChange={handleSelectChange}
            MenuProps={{
              MenuListProps: {
                sx: {
                  // Hide the placeholder option in the dropdown
                  'li[data-value=""]': {
                    display: "none",
                  },
                },
              },
            }}
          >
            <MenuItem key="placeholder" value="">
              Select a shopping list...
            </MenuItem>
            <MenuItem key="new" value="new">
              New...
            </MenuItem>
            {shoppingLists.map((list) => (
              <MenuItem key={list.id} value={list.id}>
                {list.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {selectedList === "new" && (
          <TextField
            required
            margin="dense"
            id="new-shoppinglist"
            name="new-shoppinglist"
            label="New Shopping List"
            type="text"
            fullWidth
            variant="standard"
            sx={{ m: "8px" }}
          />
        )}
        <DialogContentText sx={{ mt: "8px" }}>
          {`How much ${item?.name} do you need? If you don't know, you can change it when you're shopping!`}
        </DialogContentText>
        <TextField
          required
          margin="dense"
          id="quantity"
          name="quantity"
          label="Quantity"
          type="number"
          fullWidth
          variant="standard"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">{item?.unit}</InputAdornment>
            ),
          }}
          sx={{ m: "8px" }}
        />
      </DialogContent>
    );
  };

  return (
    <Dialog
      open={true}
      onClose={handleClose}
      PaperProps={{
        component: "form",
        onSubmit: handleSubmit,
      }}
    >
      <DialogTitle>Add to shopping list</DialogTitle>
      {getDialogContents()}
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button type="submit">Save</Button>
      </DialogActions>
    </Dialog>
  );
}
