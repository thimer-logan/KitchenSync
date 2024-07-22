"use client";

import { Store } from "@/types/shopping-list";
import { Autocomplete, TextField } from "@mui/material";
import Image from "next/image";
import React from "react";

interface StoreSelectProps {
  stores: Store[];
  value?: Store;
  onChange: (store: Store) => void;
}

const storeToString = (store: string | Store) => {
  if (typeof store === "string") {
    return store;
  }

  return store.name;
};

export default function StoreSelect({
  stores,
  value,
  onChange,
}: StoreSelectProps) {
  return (
    <Autocomplete
      freeSolo
      id="store-select"
      disableClearable
      options={stores}
      value={value}
      getOptionLabel={(option) => storeToString(option)}
      onChange={(_, newValue) => {
        if (typeof newValue === "string") {
          return;
        }

        onChange(newValue);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search for a store"
          InputProps={{
            ...params.InputProps,
            type: "search",
          }}
        />
      )}
      renderOption={(props, option) => (
        <li {...props}>
          <Image src={option.image} alt={option.name} width={48} height={48} />
          <div className="pl-2">{option.name}</div>
        </li>
      )}
    />
  );
}
