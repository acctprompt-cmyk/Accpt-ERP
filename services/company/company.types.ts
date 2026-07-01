export interface Company {

  id:string;

  name:string;

  tax_id:string | null;

  owner_email:string | null;

  storage_provider:string | null;

  plan:string | null;

  status:string | null;

}