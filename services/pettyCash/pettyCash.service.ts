import { supabase } from "../../lib/supabaseClient";

export async function getTransactions(companyId:string){

    const {data,error}=await supabase

    .from("petty_cash_transactions")

    .select("*")

    .eq("company_id",companyId)

    .order("created_at",{ascending:false});

    if(error) throw error;

    return data;

}