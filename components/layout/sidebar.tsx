"use client";

import Link from "next/link";
import { navigation } from "@/lib/navigation";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-zinc-950 border-r border-zinc-800 text-white flex flex-col">
      <div className="p-6 border-b border-zinc-800">
        <h1 className="text-2xl font-bold text-violet-500">
          512 Kustoms
        </h1>
        <p className="text-sm text-zinc-400">
          Shop Management
        </p>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {navigation.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-white transition hover:bg-violet-600"
          >
            <item.icon size={20} />
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}