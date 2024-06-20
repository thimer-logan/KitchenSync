import StorageList from "@/components/storage/StorageList";
import { Box, Typography } from "@mui/material";
import { createClient } from "@/utils/supabase/server";
import { getStorageItemCategories, getStorageItems } from "@/lib/db";

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
    <Box component="div" sx={{ maxWidth: "600px" }}>
      <StorageList items={items} sortBy={searchParams?.sortBy} />
    </Box>
  );
}
