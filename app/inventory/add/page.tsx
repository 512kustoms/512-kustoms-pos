import AppShell from "@/components/layout/appshell";
import ProductForm from "@/components/inventory/productForm";
import { prisma } from "@/lib/prisma";
export const dynamic = "force-dynamic";
export default async function AddProductPage() {

  const brands = await prisma.brand.findMany({
    orderBy: {
      name: "asc",
    },
  });

  const locations = await prisma.location.findMany({
    orderBy: {
      name: "asc",
    },
  });

  return (
    <AppShell>

      <div className="space-y-6">

        <div>

          <h1 className="text-4xl font-bold text-white">
            Add Product
          </h1>

          <p className="mt-2 text-zinc-400">
            Create a new inventory item.
          </p>

        </div>

        <ProductForm
          brands={brands}
          locations={locations}
        />

      </div>

    </AppShell>
  );
}