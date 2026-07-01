"use client";

import { useEffect, useState } from "react";
import AppLayout from "../../components/layout/AppLayout";
import { supabase } from "../../lib/supabaseClient";

type Transaction = {
  id: string;
  transaction_date: string;
  document_no: string | null;
  type: string | null;
  description: string | null;
  requester_name: string | null;
  vendor_name: string | null;
  amount_include_vat: number | null;
  status: string | null;
};

export default function PettyCashPage() {
  const [companyId, setCompanyId] = useState("");
  const [userId, setUserId] = useState("");
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    transaction_date: new Date().toISOString().slice(0, 10),
    document_no: "",
    type: "expense",
    description: "",
    requester_name: "",
    vendor_name: "",
    amount_include_vat: "",
    note: "",
  });

  useEffect(() => {
    init();
  }, []);

  async function init() {
    const { data: auth } = await supabase.auth.getUser();

    if (!auth.user) {
      window.location.href = "/";
      return;
    }

    setUserId(auth.user.id);

    const { data: member } = await supabase
      .from("company_members")
      .select("company_id")
      .eq("user_id", auth.user.id)
      .eq("status", "active")
      .single();

    if (!member) {
      setLoading(false);
      return;
    }

    setCompanyId(member.company_id);
    await loadTransactions(member.company_id);
  }

  async function loadTransactions(currentCompanyId: string) {
    const { data, error } = await supabase
      .from("petty_cash_transactions")
      .select(
        "id, transaction_date, document_no, type, description, requester_name, vendor_name, amount_include_vat, status"
      )
      .eq("company_id", currentCompanyId)
      .order("transaction_date", { ascending: false });

    if (error) {
      alert("โหลดข้อมูลไม่สำเร็จ: " + error.message);
      setLoading(false);
      return;
    }

    setTransactions(data || []);
    setLoading(false);
  }

  async function addTransaction() {
    if (!companyId || !userId) return;

    if (!form.description || !form.amount_include_vat) {
      alert("กรุณากรอกรายละเอียดและจำนวนเงิน");
      return;
    }

    setSaving(true);

    const amount = Number(form.amount_include_vat);

    const { error } = await supabase.from("petty_cash_transactions").insert({
      company_id: companyId,
      requester_id: userId,
      requester_name: form.requester_name || "-",
      transaction_date: form.transaction_date,
      document_no: form.document_no || null,
      type: form.type,
      description: form.description,
      vendor_name: form.vendor_name || null,
      amount_include_vat: amount,
      before_vat: amount,
      vat_amount: 0,
      wht_amount: 0,
      net_paid: amount,
      receipt_type: "receipt",
      doc_received: false,
      status: "draft",
      note: form.note || null,
    });

    setSaving(false);

    if (error) {
      alert("บันทึกไม่สำเร็จ: " + error.message);
      return;
    }

    setForm({
      transaction_date: new Date().toISOString().slice(0, 10),
      document_no: "",
      type: "expense",
      description: "",
      requester_name: "",
      vendor_name: "",
      amount_include_vat: "",
      note: "",
    });

    await loadTransactions(companyId);
  }

  return (
    <AppLayout>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-blue-900">Petty Cash</h2>
          <p className="mt-2 text-gray-600">เพิ่มและดูรายการเงินสดย่อย</p>
        </div>
      </div>

      <div className="mt-8 rounded-xl bg-white p-6 shadow">
        <h3 className="text-xl font-bold text-blue-900">เพิ่มรายการ</h3>

        <div className="mt-4 grid grid-cols-2 gap-4">
          <input
            type="date"
            className="rounded-lg border px-4 py-3"
            value={form.transaction_date}
            onChange={(e) =>
              setForm({ ...form, transaction_date: e.target.value })
            }
          />

          <input
            className="rounded-lg border px-4 py-3"
            placeholder="เลขที่เอกสาร"
            value={form.document_no}
            onChange={(e) => setForm({ ...form, document_no: e.target.value })}
          />

          <input
            className="rounded-lg border px-4 py-3"
            placeholder="ผู้เบิก"
            value={form.requester_name}
            onChange={(e) =>
              setForm({ ...form, requester_name: e.target.value })
            }
          />

          <input
            className="rounded-lg border px-4 py-3"
            placeholder="ร้านค้า / ผู้ขาย"
            value={form.vendor_name}
            onChange={(e) => setForm({ ...form, vendor_name: e.target.value })}
          />

          <input
            className="rounded-lg border px-4 py-3 col-span-2"
            placeholder="รายละเอียดรายการ"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />

          <input
            type="number"
            className="rounded-lg border px-4 py-3"
            placeholder="จำนวนเงินรวม VAT"
            value={form.amount_include_vat}
            onChange={(e) =>
              setForm({ ...form, amount_include_vat: e.target.value })
            }
          />

          <input
            className="rounded-lg border px-4 py-3"
            placeholder="หมายเหตุ"
            value={form.note}
            onChange={(e) => setForm({ ...form, note: e.target.value })}
          />
        </div>

        <button
          onClick={addTransaction}
          disabled={saving}
          className="mt-5 rounded-lg bg-blue-900 px-6 py-3 text-white font-semibold hover:bg-blue-800 disabled:opacity-50"
        >
          {saving ? "กำลังบันทึก..." : "บันทึกรายการ"}
        </button>
      </div>

      <div className="mt-8 rounded-xl bg-white shadow overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-100">
            <tr>
              <th className="p-4">วันที่</th>
              <th className="p-4">เลขที่เอกสาร</th>
              <th className="p-4">รายละเอียด</th>
              <th className="p-4">ผู้เบิก</th>
              <th className="p-4 text-right">จำนวนเงิน</th>
              <th className="p-4">สถานะ</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} className="p-6 text-center text-gray-500">
                  กำลังโหลด...
                </td>
              </tr>
            ) : transactions.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-6 text-center text-gray-500">
                  ยังไม่มีรายการ
                </td>
              </tr>
            ) : (
              transactions.map((item) => (
                <tr key={item.id} className="border-t">
                  <td className="p-4">{item.transaction_date}</td>
                  <td className="p-4">{item.document_no || "-"}</td>
                  <td className="p-4">{item.description}</td>
                  <td className="p-4">{item.requester_name || "-"}</td>
                  <td className="p-4 text-right">
                    {(item.amount_include_vat || 0).toLocaleString()}
                  </td>
                  <td className="p-4">
                    <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm text-yellow-700">
                      {item.status || "draft"}
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