"use client";

import { Bell, Search, UserCircle2 } from "lucide-react";

export default function Header() {
  return (
    <header className="flex h-16 items-center justify-between border-b border-zinc-800 bg-zinc-950 px-6">

      <div className="flex items-center gap-3 rounded-lg bg-zinc-900 px-4 py-2 w-96">

        <Search
          size={18}
          className="text-zinc-400"
        />

        <input
          type="text"
          placeholder="Search products, customers..."
          className="w-full bg-transparent text-white outline-none placeholder:text-zinc-500"
        />

      </div>

      <div className="flex items-center gap-6">

        <Bell
          size={20}
          className="cursor-pointer text-zinc-400 hover:text-violet-500"
        />

        <div className="flex items-center gap-3">

          <UserCircle2
            size={36}
            className="text-violet-500"
          />

          <div>

            <p className="font-semibold text-white">
              Cristian
            </p>

            <p className="text-xs text-zinc-500">
              Administrator
            </p>

          </div>

        </div>

      </div>

    </header>
  );
}