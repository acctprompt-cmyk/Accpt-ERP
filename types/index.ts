export type Company = {
  id: string;
  name: string;
  status: string;
  plan?: string | null;
};

export type CompanyMember = {
  id: string;
  company_id: string;
  user_id: string;
  role: string;
  status: string;
};

export type AppUser = {
  id: string;
  email?: string;
};