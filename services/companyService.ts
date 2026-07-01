import { supabase } from "../lib/supabaseClient";

export async function getMyCompany(userId: string) {
  const { data, error } = await supabase
    .from("company_members")
    .select("role, status, companies(id, name, status, plan)")
    .eq("user_id", userId)
    .eq("status", "active")
    .single();

  if (error) throw error;

  return data;
}