import AppLayout from "../../components/layout/AppLayout";

export default function CompanyPage() {
  return (
    <AppLayout>
      <h2 className="text-3xl font-bold text-blue-900">Companies</h2>
      <p className="mt-2 text-gray-600">จัดการข้อมูลบริษัท</p>

      <div className="mt-8 rounded-xl bg-white p-6 shadow">
        <p className="text-gray-500">เตรียมเชื่อมข้อมูลจากตาราง companies</p>
      </div>
    </AppLayout>
  );
}