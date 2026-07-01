import Sidebar from "../../components/layout/Sidebar";
import Topbar from "../../components/layout/Topbar";

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar />

      <div className="flex-1">
        <Topbar />

        <main className="p-8">
          <h2 className="text-3xl font-bold text-blue-900">
            Dashboard
          </h2>

          <p className="mt-2 text-gray-600">
            ยินดีต้อนรับเข้าสู่ระบบ ACCPT ERP
          </p>

          <div className="grid grid-cols-3 gap-6 mt-8">
            <div className="bg-white rounded-xl shadow p-6">
              <p className="text-gray-500">บริษัท</p>
              <h3 className="text-2xl font-bold text-blue-900 mt-2">
                ACCPT ERP
              </h3>
            </div>

            <div className="bg-white rounded-xl shadow p-6">
              <p className="text-gray-500">โมดูล</p>
              <h3 className="text-2xl font-bold text-blue-900 mt-2">
                Petty Cash
              </h3>
            </div>

            <div className="bg-white rounded-xl shadow p-6">
              <p className="text-gray-500">สถานะ</p>
              <h3 className="text-2xl font-bold text-green-600 mt-2">
                Active
              </h3>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}