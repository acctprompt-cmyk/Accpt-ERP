import AppLayout from "../../components/layout/AppLayout";

export default function PettyCashPage() {
  return (
    <AppLayout>
      <h2 className="text-3xl font-bold text-blue-900">Petty Cash</h2>

      <p className="mt-2 text-gray-600">
        ระบบจัดการเงินสดย่อยของบริษัท
      </p>

      <div className="mt-8 rounded-xl bg-white p-6 shadow">
        <p className="text-gray-500">
          Module พร้อมสำหรับเชื่อมข้อมูลรายการเบิกเงินสดย่อย
        </p>
      </div>
    </AppLayout>
  );
}