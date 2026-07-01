"use client";

import { useEffect, useState } from "react";
import AppLayout from "../../components/layout/AppLayout";
import { supabase } from "../../lib/supabaseClient";

type Company = {
  id: string;
  name: string;
  tax_id: string | null;
  plan: string | null;
  status: string | null;
  owner_email: string | null;
  storage_provider: string | null;
};

export default function CompanyPage() {
  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCompany() {
      const { data: userData } = await supabase.auth.getUser();

      if (!userData.user) {
        window.location.href = "/";
        return;
      }

      const { data, error } = await supabase
        .from("company_members")
        .select("companies(id, name, tax_id, plan, status, owner_email, storage_provider)")
        .eq("user_id", userData.user.id)
        .eq("status", "active")
        .single();

      if (error) {
        console.error(error);
        setLoading(false);
        return;
      }

      const companyData = Array.isArray(data.companies)
        ? data.companies[0]
        : data.companies;

      setCompany(companyData as Company);
      setLoading(false);
    }

    loadCompany();
  }, []);

  return (
    <AppLayout>
      <h2 className="text-3xl font-bold text-blue-900">Companies</h2>
      <p className="mt-2 text-gray-600">จัดการข้อมูลบริษัท</p>

      <div className="mt-8 rounded-xl bg-white p-6 shadow">
        {loading ? (
          <p className="text-gray-500">กำลังโหลดข้อมูล...</p>
        ) : company ? (
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-gray-500">ชื่อบริษัท</p>
              <p className="mt-1 text-xl font-bold text-blue-900">{company.name}</p>
            </div>

            <div>
              <p className="text-gray-500">เลขประจำตัวผู้เสียภาษี</p>
              <p className="mt-1">{company.tax_id || "-"}</p>
            </div>

            <div>
              <p className="text-gray-500">Plan</p>
              <p className="mt-1">{company.plan || "-"}</p>
            </div>

            <div>
              <p className="text-gray-500">Status</p>
              <p className="mt-1 text-green-600 font-semibold">{company.status || "-"}</p>
            </div>

            <div>
              <p className="text-gray-500">Owner Email</p>
              <p className="mt-1">{company.owner_email || "-"}</p>
            </div>

            <div>
              <p className="text-gray-500">Storage Provider</p>
              <p className="mt-1">{company.storage_provider || "-"}</p>
            </div>
          </div>
        ) : (
          <p className="text-red-600">ไม่พบข้อมูลบริษัท</p>
        )}
      </div>
    </AppLayout>
  );
}