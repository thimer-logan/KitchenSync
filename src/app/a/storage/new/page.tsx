import { getStorageItemCategories } from "@/lib/db";
import { createClient } from "@/utils/supabase/server";
import dynamic from "next/dynamic";
import React from "react";

const IngredientFormWithNoSSR = dynamic(
  () => import("@/components/storage/StorageItemForm"),
  { ssr: false }
);

export default async function NewStorageItemPage() {
  const supabase = createClient();
  const { ingredientCategories, error } = await getStorageItemCategories(
    supabase
  );

  if (error) {
    console.log(error);
    return <div>Error loading categories</div>;
  }

  return <IngredientFormWithNoSSR categories={ingredientCategories} />;
}
