"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

function objectifyFormData(data: FormData) {
  return {
    name: data.get("name"),
    description: data.get("description"),
    category: data.get("category"),
    brand: data.get("brand"),
    quantity: data.get("quantity"),
    unit: data.get("unit"),
  };
}

export async function createStorageItem(data: FormData) {
  const supabase = createClient();
  const { data: resData, error } = await supabase
    .from("storage")
    .insert(objectifyFormData(data))
    .select()
    .single();

  console.log(resData, error);

  revalidatePath("/a/storage");
  redirect("/a/storage");
}

export async function updateStorageItem(id: string, data: FormData) {
  const supabase = createClient();
  const { data: resData, error } = await supabase
    .from("storage")
    .update(objectifyFormData(data))
    .eq("id", id)
    .select()
    .single();

  console.log(resData, error);

  revalidatePath("/a/storage");
  redirect("/a/storage");
}

export async function deleteStorageItem(id: string) {
  const supabase = createClient();
  const { error } = await supabase.from("storage").delete().eq("id", id);

  console.log(error);

  revalidatePath("/a/storage");
  redirect("/a/storage");
}
