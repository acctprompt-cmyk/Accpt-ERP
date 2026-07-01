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
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadCompany();
  }, []);

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

  async function saveCompany() {
    if (!company) return;

    setSaving(true);

    const { error } = await supabase
      .from("companies")
      .update({
        name: company.name,
        tax_id: company.tax_id,
        owner_email: company.owner_email,
        storage_provider: company.storage_provider,
      })
      .eq("id", company.id);

    setSaving(false);

    if (error) {
      alert("บันทึกไม่สำเร็จ: " + error.message);
      return;
    }

    alert("บันทึกข้อมูลบริษัทเรียบร้อย");
  }

  function updateField(field: keyof Company, value: string) {
    if (!company) return;
    setCompany({ ...company, [field]: value });
  }

  return (
    <AppLayout>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-blue-900">Company</h2>
          <p className="mt-2 text-gray-600">จัดการข้อมูลบริษัท</p>
        </div>

        <button
          onClick={saveCompany}
          disabled={saving || !company}
          className="rounded-lg bg-blue-900 px-5 py-3 text-white font-semibold hover:bg-blue-800 disabled:opacity-50"
        >
          {saving ? "กำลังบันทึก..." : "Save"}
        </button>
      </div>

      <div className="mt-8 rounded-xl bg-white p-6 shadow">
        {loading ? (
          <p className="text-gray-500">กำลังโหลดข้อมูล...</p>
        ) : company ? (
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="text-sm text-gray-500">ชื่อบริษัท</label>
              <input
                className="mt-1 w-full rounded-lg border px-4 py-3"
                value={company.name || ""}
                onChange={(e) => updateField("name", e.target.value)}
              />
            </div>

            <div>
              <label className="text-sm text-gray-500">
                เลขประจำตัวผู้เสียภาษี
              </label>
              <input
                className="mt-1 w-full rounded-lg border px-4 py-3"
                value={company.tax_id || ""}
                onChange={(e) => updateField("tax_id", e.target.value)}
              />
            </div>

            <div>
              <label className="text-sm text-gray-500">Owner Email</label>
              <input
                className="mt-1 w-full rounded-lg border px-4 py-3"
                value={company.owner_email || ""}
                onChange={(e) => updateField("owner_email", e.target.value)}
              />
            </div>

            <div>
              <label className="text-sm text-gray-500">Storage Provider</label>
              <select
                className="mt-1 w-full rounded-lg border px-4 py-3"
                value={company.storage_provider || "supabase"}
                onChange={(e) =>
                  updateField("storage_provider", e.target.value)
                }
              >
                <option value="supabase">Supabase Storage</option>
                <option value="google_drive">Google Drive</option>
              </select>
            </div>

            <div>
              <label className="text-sm text-gray-500">Plan</label>
              <input
                className="mt-1 w-full rounded-lg border px-4 py-3 bg-gray-100"
                value={company.plan || ""}
                disabled
              />
            </div>

            <div>
              <label className="text-sm text-gray-500">Status</label>
              <input
                className="mt-1 w-full rounded-lg border px-4 py-3 bg-gray-100"
                value={company.status || ""}
                disabled
              />
            </div>
          </div>
        ) : (
          <p className="text-red-600">ไม่พบข้อมูลบริษัท</p>
        )}
      </div>
    </AppLayout>
  );
}