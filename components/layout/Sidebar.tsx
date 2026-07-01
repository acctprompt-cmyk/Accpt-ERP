"use client";

import { usePathname } from "next/navigation";
import { APP_MENU } from "../../constants/menu";

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 min-h-screen bg-blue-950 text-white p-6">
      <h1 className="text-2xl font-bold mb-8">ACCPT ERP</h1>

      <nav className="space-y-2">
        {APP_MENU.map((menu) => {
          const active = pathname === menu.href;

          return (
            <a
              key={menu.href}
              href={menu.href}
              className={`block rounded-lg px-4 py-3 ${
                active
                  ? "bg-white text-blue-950 font-semibold"
                  : "hover:bg-blue-800"
              }`}
            >
              {menu.name}
            </a>
          );
        })}
      </nav>
    </aside>
  );
}