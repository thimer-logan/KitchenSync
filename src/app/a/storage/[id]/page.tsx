import StorageItemForm from "@/components/storage/StorageItemForm";
import { getStorageItemCategories } from "@/lib/db";
import { createClient } from "@/utils/supabase/server";
import React, { cache } from "react";

const getData = cache(async (id: string) => {
  const supabase = createClient();
  const ingredientPromise = supabase
    .from("storage")
    .select()
    .eq("id", id)
    .single();

  const categoriesPromise = getStorageItemCategories(supabase);

  const [ingredientResult, categoriesResult] = await Promise.all([
    ingredientPromise,
    categoriesPromise,
  ]);

  const { data, error } = ingredientResult;
  const { ingredientCategories: categories, error: catError } =
    categoriesResult;

  const combinedError = error || catError;

  if (combinedError) {
    console.log(combinedError);
    return null;
  }

  return { ingredient: data, categories };
});

export default async function StorageItemPage({
  params,
}: {
  params: { id: string };
}) {
  const data = await getData(params.id);

  if (!data?.ingredient) {
    return <div>Ingredient not found</div>;
  }

  return (
    <StorageItemForm
      categories={data.categories}
      defaultValues={data.ingredient}
    />
  );
}
