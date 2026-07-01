"use client";

import { usePathname } from "next/navigation";
import { supabase } from "../../lib/supabaseClient";
import { APP_MENU } from "../../constants/menu";

export default function Topbar() {
  const pathname = usePathname();
  const currentMenu = APP_MENU.find((menu) => menu.href === pathname);
  const title = currentMenu?.name ?? "ACCPT ERP";

  async function logout() {
    await supabase.auth.signOut();
    window.location.href = "/";
  }

  return (
    <header className="h-16 bg-white border-b flex items-center justify-between px-8">
      <div>
        <div className="font-semibold text-blue-900">{title}</div>
        <div className="text-xs text-gray-500">Home / {title}</div>
      </div>

      <button
        onClick={logout}
        className="rounded-lg bg-slate-100 px-4 py-2 text-sm hover:bg-slate-200"
      >
        Logout
      </button>
    </header>
  );
}