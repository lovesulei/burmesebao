import { supabase } from "../lib/supabase";

export async function getPhrases(categoryId) {
  const { data, error } = await supabase
    .from("phrases")
    .select("*")
    .eq("category_id", categoryId)
    .order("order_index");

  if (error) {
    throw error;
  }

  return data;
}