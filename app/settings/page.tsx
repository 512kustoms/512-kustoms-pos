import AppShell from "@/components/layout/appshell";
import Link from "next/link";

export default function SettingsPage() {
  return (
    <AppShell>
      <div className="space-y-6">
        <h1 className="text-4xl font-bold text-white">
          Settings
        </h1>

        <div className="grid gap-4 md:grid-cols-2">
          <Link
            href="/settings/brands"
            className="rounded-lg border border-zinc-700 bg-zinc-900 p-6 hover:border-blue-500"
          >
            <h2 className="text-xl font-semibold text-white">
              Brands
            </h2>

            <p className="mt-2 text-zinc-400">
              Manage product brands.
            </p>
          </Link>

          <Link
            href="/settings/locations"
            className="rounded-lg border border-zinc-700 bg-zinc-900 p-6 hover:border-blue-500"
          >
            <h2 className="text-xl font-semibold text-white">
              Locations
            </h2>

            <p className="mt-2 text-zinc-400">
              Manage inventory locations.
            </p>
          </Link>
        </div>
      </div>
    </AppShell>
  );
}