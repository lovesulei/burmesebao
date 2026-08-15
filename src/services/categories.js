import { supabase } from "../lib/supabase";

export async function getCategories() {
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("order_index");

  if (error) {
    throw error;
  }

  return data;
}

export async function getCategory(categoryId) {
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .eq("id", categoryId)
    .single();

  if (error) {
    throw error;
  }

  return data;
}