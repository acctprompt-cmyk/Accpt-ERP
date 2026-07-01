"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    async function checkSession() {
      const { data } = await supabase.auth.getSession();

      if (!data.session) {
        window.location.href = "/";
        return;
      }

      setChecking(false);
    }

    checkSession();
  }, []);

  if (checking) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-slate-100">
        <p className="text-blue-900 font-semibold">กำลังตรวจสอบสิทธิ์...</p>
      </main>
    );
  }

  return <>{children}</>;
}