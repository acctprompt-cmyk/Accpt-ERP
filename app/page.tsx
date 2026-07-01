"use client";

import { useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  async function handleLogin() {
    setMessage("กำลังเข้าสู่ระบบ...");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setMessage("เข้าสู่ระบบไม่สำเร็จ: " + error.message);
      return;
    }

    window.location.href = "/dashboard";
  }

  return (
    <main className="min-h-screen bg-slate-100 flex items-center justify-center">
      <div className="bg-white shadow-xl rounded-xl p-10 w-[420px]">
        <h1 className="text-3xl font-bold text-center text-blue-900">
          ACCPT ERP
        </h1>

        <p className="text-center text-gray-500 mt-2">
          Accounting Cloud Platform
        </p>

        <div className="mt-8 space-y-4">
          <input
            className="w-full rounded-lg border border-gray-300 px-4 py-3"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            className="w-full rounded-lg border border-gray-300 px-4 py-3"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            onClick={handleLogin}
            className="w-full rounded-lg bg-blue-900 py-3 text-white font-semibold hover:bg-blue-800"
          >
            Login
          </button>

          {message && (
            <p className="text-center text-sm text-gray-600">{message}</p>
          )}
        </div>
      </div>
    </main>
  );
}