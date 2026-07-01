"use client";

import { supabase } from "../../lib/supabaseClient";

export default function Topbar() {
  async function logout() {
    await supabase.auth.signOut();
    window.location.href = "/";
  }

  return (
    <header className="h-16 bg-white border-b flex items-center justify-between px-8">
      <div className="font-semibold text-blue-900">ACCPT ERP Dashboard</div>

      <button
        onClick={logout}
        className="rounded-lg bg-slate-100 px-4 py-2 text-sm hover:bg-slate-200"
      >
        Logout
      </button>
    </header>
  );
}