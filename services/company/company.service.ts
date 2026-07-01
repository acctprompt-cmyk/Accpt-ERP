import { supabase } from "../../lib/supabaseClient";

export async function getCurrentCompany(userId: string) {
  const { data: member } = await supabase
    .from("company_members")
    .select("company_id")
    .eq("user_id", userId)
    .eq("status", "active")
    .single();

  if (!member) return null;

  const { data } = await supabase
    .from("companies")
    .select("*")
    .eq("id", member.company_id)
    .single();

  return data;
}