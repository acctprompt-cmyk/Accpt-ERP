"use client";

import { useEffect, useState } from "react";
import AppLayout from "../../components/layout/AppLayout";
import { supabase } from "../../lib/supabaseClient";

type CompanyMember = {
  id: string;
  user_id: string;
  role: string;
  status: string;
};

export default function UsersPage() {
  const [members, setMembers] = useState<CompanyMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMembers();
  }, []);

  async function loadMembers() {
    // ตรวจสอบผู้ใช้
    const { data: auth } = await supabase.auth.getUser();

    if (!auth.user) {
      window.location.href = "/";
      return;
    }

    // หาบริษัทของผู้ใช้
    const { data: memberData, error: memberError } = await supabase
      .from("company_members")
      .select("company_id")
      .eq("user_id", auth.user.id)
      .eq("status", "active")
      .single();

    if (memberError || !memberData) {
      console.error(memberError);
      setLoading(false);
      return;
    }

    // โหลดสมาชิกทั้งหมดในบริษัท
    const { data, error } = await supabase
      .from("company_members")
      .select("id, user_id, role, status")
      .eq("company_id", memberData.company_id)
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      setLoading(false);
      return;
    }

    setMembers(data || []);
    setLoading(false);
  }

  return (
    <AppLayout>
      <h2 className="text-3xl font-bold text-blue-900">Users</h2>

      <p className="mt-2 text-gray-600">
        จัดการผู้ใช้งานภายในบริษัท
      </p>

      <div className="mt-8 rounded-xl bg-white shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-100">
            <tr>
              <th className="p-4 text-left">User ID</th>
              <th className="p-4 text-left">Role</th>
              <th className="p-4 text-left">Status</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan={3} className="p-6 text-center">
                  กำลังโหลดข้อมูล...
                </td>
              </tr>
            ) : members.length === 0 ? (
              <tr>
                <td colSpan={3} className="p-6 text-center">
                  ไม่พบข้อมูลผู้ใช้งาน
                </td>
              </tr>
            ) : (
              members.map((member) => (
                <tr key={member.id} className="border-t">
                  <td className="p-4 font-mono text-sm">
                    {member.user_id}
                  </td>

                  <td className="p-4">
                    <span className="font-semibold text-blue-900">
                      {member.role}
                    </span>
                  </td>

                  <td className="p-4">
                    <span
                      className={`rounded-full px-3 py-1 text-sm font-medium ${
                        member.status === "active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {member.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </AppLayout>
  );
}