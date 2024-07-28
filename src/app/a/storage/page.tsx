import StorageList from "@/components/storage/StorageList";
import { Box, Fab, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { createClient } from "@/utils/supabase/server";
import { getStorageItemCategories, getStorageItems } from "@/lib/db";
import StorageHeader from "./StorageHeader";
import Link from "next/link";

async function getData() {
  const supabase = createClient();
  const storagePromise = getStorageItems(supabase);
  const categoriesPromise = getStorageItemCategories(supabase);

  const [storageResult, categoriesResult] = await Promise.all([
    storagePromise,
    categoriesPromise,
  ]);

  const { items, error } = storageResult;
  const { ingredientCategories: categories, error: catError } =
    categoriesResult;

  const combinedError = error || catError;

  return { items, categories, error: combinedError };
}

export default async function StoragePage({
  searchParams,
}: {
  searchParams?: { query?: string; sortBy?: string; filterBy?: string };
}) {
  let { items, categories, error } = await getData();

  if (error) {
    console.error(error);
    return <Typography>Error loading ingredients</Typography>;
  }

  // Filtering step first
  if (searchParams?.filterBy) {
    if (searchParams.filterBy.toLowerCase() === "lowstock") {
      items = items.filter((item) => item.quantity <= 0);
    } else if (searchParams.filterBy.toLowerCase() === "instock") {
      items = items.filter((item) => item.quantity > 0);
    }
  }

  // Search query will check names and brand
  if (searchParams?.query) {
    items = items.filter(
      (item) =>
        item.name
          .toLowerCase()
          .includes(searchParams.query?.toLowerCase() ?? "") ||
        item?.brand
          ?.toLowerCase()
          .includes(searchParams.query?.toLowerCase() ?? "")
    );
  }

  return (
    <Box component="div">
      <StorageHeader />
      <Box component="div" sx={{ maxWidth: "600px" }}>
        <StorageList items={items} sortBy={searchParams?.sortBy} />
      </Box>
      <Fab
        color="primary"
        aria-label="add"
        sx={{ position: "fixed", bottom: 8, right: 8 }}
      >
        <Link href="/a/storage/new" passHref>
          <AddIcon />
        </Link>
      </Fab>
    </Box>
  );
}
