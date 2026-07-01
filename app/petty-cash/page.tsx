import Sidebar from "../../components/layout/Sidebar";
import Topbar from "../../components/layout/Topbar";

export default function PettyCashPage() {
  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar />

      <div className="flex-1">
        <Topbar />

        <main className="p-8">
          <h2 className="text-3xl font-bold text-blue-900">Petty Cash</h2>
          <p className="mt-2 text-gray-600">
            ระบบจัดการเงินสดย่อยของบริษัท
          </p>

          <div className="mt-8 rounded-xl bg-white p-6 shadow">
            <p className="text-gray-500">Module พร้อมสำหรับเชื่อมข้อมูลรายการเบิกเงินสดย่อย</p>
          </div>
        </main>
      </div>
    </div>
  );
}