import AppShell from "@/components/layout/appshell";
import { prisma } from "@/lib/prisma";
import {
  addLocation,
  deleteLocation,
} from "@/app/actions/settings";

export default async function LocationSettingsPage() {

  const locations = await prisma.location.findMany({
    orderBy: {
      name: "asc",
    },
  });

  return (
    <AppShell>

      <div className="space-y-8">

        <div>

          <h1 className="text-4xl font-bold text-white">
            Shelf Locations
          </h1>

          <p className="text-zinc-400">
            Manage storage locations for inventory.
          </p>

        </div>

        {/* Add Location */}

        <form
          action={addLocation}
          className="flex gap-4"
        >

          <input
            name="name"
            required
            placeholder="Location Name"
            className="flex-1 rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-white outline-none focus:border-violet-500"
          />

          <button
            className="rounded-xl bg-violet-600 px-6 py-3 font-semibold text-white hover:bg-violet-700"
          >
            Add Location
          </button>

        </form>

        {/* Location List */}

        <div className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900">

          {locations.length === 0 && (

            <div className="p-8 text-center text-zinc-500">
              No locations have been created.
            </div>

          )}

          {locations.map((location) => (

            <div
              key={location.id}
              className="flex items-center justify-between border-b border-zinc-800 p-4 last:border-b-0"
            >

              <span className="text-white">
                {location.name}
              </span>

              <form action={deleteLocation}>

                <input
                  type="hidden"
                  name="id"
                  value={location.id}
                />

                <button
                  className="rounded-lg bg-red-600 px-4 py-2 font-medium text-white hover:bg-red-700"
                >
                  Delete
                </button>

              </form>

            </div>

          ))}

        </div>

      </div>

    </AppShell>
  );
}