"use client";

import {
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export default function StorageHeader() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleSearchChange = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams);

    if (term?.target?.value) {
      params.set("query", term.target.value);
    } else {
      params.delete("query");
    }
    router.push(`?${params.toString()}`);
  }, 300);

  const handleSortChange = (event: SelectChangeEvent<string>) => {
    const params = new URLSearchParams(searchParams);
    if (event.target.value) {
      params.set("sortBy", event.target.value);
    }

    router.push(`?${params.toString()}`);
  };

  const handleFilterChange = (event: SelectChangeEvent<string>) => {
    const params = new URLSearchParams(searchParams);
    if (event.target.value) {
      params.set("filterBy", event.target.value);
    }

    router.push(`?${params.toString()}`);
  };

  return (
    <Grid
      container
      spacing={2}
      sx={{
        mt: { xs: "auto", md: 0 },
      }}
      // bgcolor="background.paper"
    >
      <Grid item xs={12} md={4}>
        <TextField
          label="Search Ingredients"
          variant="outlined"
          defaultValue={searchParams.get("query")?.toString()}
          onChange={handleSearchChange}
          fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Grid>
      <Grid item xs={6} md={2}>
        <FormControl variant="outlined" fullWidth>
          <InputLabel id="sort-label">Sort By</InputLabel>
          <Select
            labelId="sort-label"
            defaultValue={searchParams.get("sortBy")?.toString()}
            label="Sort By"
            onChange={handleSortChange}
            autoWidth
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
              Select...
            </MenuItem>
            <MenuItem value="name">Name</MenuItem>
            <MenuItem value="brand">Brand</MenuItem>
            <MenuItem value="category">Category</MenuItem>
            <MenuItem value="quantity">Quantity</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={6} md={2}>
        <FormControl variant="outlined" fullWidth>
          <InputLabel id="filter-label">Filter By</InputLabel>
          <Select
            labelId="filter-label"
            defaultValue={searchParams.get("filterBy")?.toString()}
            label="Filter By"
            onChange={handleFilterChange}
            autoWidth
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
              Select...
            </MenuItem>
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="lowStock">Low Stock</MenuItem>
            <MenuItem value="inStock">In Stock</MenuItem>
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
}
