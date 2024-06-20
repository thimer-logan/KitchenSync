"use client";

import { StorageItem, Units } from "@/types/storage";
import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React from "react";
import SubmitButton from "../buttons/SubmitButton";
import { createStorageItem, updateStorageItem } from "@/app/a/storage/actions";

interface IngredientFormProps {
  categories: string[];
  defaultValues?: StorageItem;
}

export default function IngredientForm({
  categories,
  defaultValues,
}: IngredientFormProps) {
  const submissionAction =
    defaultValues && defaultValues.id
      ? updateStorageItem.bind(null, defaultValues.id)
      : createStorageItem;

  return (
    <Box
      component="form"
      action={submissionAction}
      sx={{
        display: "flex",
        flexDirection: "column",
        m: 3,
        "& .MuiTextField-root": { m: 1 },
        "& .MuiButton-root": { m: 1 },
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            id="item-name"
            label="Name"
            name="name"
            defaultValue={defaultValues?.name || ""}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            id="item-description"
            label="Description"
            name="description"
            defaultValue={defaultValues?.description || ""}
            variant="outlined"
            multiline
            rows={3}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            id="item-brand"
            label="Brand"
            name="brand"
            defaultValue={defaultValues?.brand || ""}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth required sx={{ m: "8px" }}>
            <InputLabel id="category-label">Category</InputLabel>
            <Select
              labelId="category-label"
              id="category-select"
              label="Category"
              name="category"
              defaultValue={defaultValues?.category || categories[0]}
            >
              {categories.map((c) => (
                <MenuItem key={c} value={c}>
                  {c}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth required sx={{ m: "8px" }}>
            <InputLabel id="unit-label">Unit</InputLabel>
            <Select
              labelId="unit-label"
              id="unit-select"
              label="Unit"
              name="unit"
              defaultValue={defaultValues?.unit || Units.Ounces}
            >
              {Object.keys(Units).map((unit) => (
                <MenuItem key={unit} value={Units[unit as keyof typeof Units]}>
                  {unit}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <TextField
            required
            fullWidth
            id="item-quantity"
            label="Quantity"
            name="quantity"
            type="number"
            defaultValue={defaultValues?.quantity || 0}
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            required
            fullWidth
            id="item-threshold"
            label="Threshold"
            name="threshold"
            type="number"
            defaultValue={defaultValues?.threshold || 0}
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
          />
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
