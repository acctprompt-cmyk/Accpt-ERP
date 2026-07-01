const menus = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Petty Cash", href: "/petty-cash" },
  { name: "Companies", href: "/company" },
  { name: "Users", href: "/users" },
  { name: "Settings", href: "/settings" },
];

export default function Sidebar() {
  return (
    <aside className="w-64 min-h-screen bg-blue-950 text-white p-6">
      <h1 className="text-2xl font-bold mb-8">ACCPT ERP</h1>

      <nav className="space-y-2">
        {menus.map((menu) => (
          <a
            key={menu.href}
            href={menu.href}
            className="block rounded-lg px-4 py-3 hover:bg-blue-800"
          >
            {menu.name}
          </a>
        ))}
      </nav>
    </aside>
  );
}