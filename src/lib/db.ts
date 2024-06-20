import { StorageItem } from "@/types/storage";
import { SupabaseClient } from "@supabase/supabase-js";

export async function getStorageItems(supabase: SupabaseClient) {
  const { data, error } = await supabase.from("storage").select("*");
  const items: StorageItem[] = data || [];

  return { items, error };
}

export async function getStorageItemCategories(supabase: SupabaseClient) {
  const { data, error } = await supabase.from("categories").select("name");

  const ingredientCategories: string[] =
    data?.map((item: { name: any }) => item.name) || [];

  return { ingredientCategories, error };
}
