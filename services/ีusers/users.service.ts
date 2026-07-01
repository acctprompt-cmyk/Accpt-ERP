import { supabase } from "../../lib/supabaseClient";

export async function getCompanyUsers(companyId:string){

    const {data,error}=await supabase

    .from("company_members")

    .select("*")

    .eq("company_id",companyId);

    if(error) throw error;

    return data;

}