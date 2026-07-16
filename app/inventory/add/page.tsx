import AppShell from "@/components/layout/appshell";
import ProductForm from "@/components/inventory/productForm";

export default function AddProductPage() {
  return (
    <AppShell>
      <div className="mx-auto max-w-5xl space-y-8">
        <div>
          <h1 className="text-4xl font-bold text-white">
            Add Product
          </h1>

          <p className="mt-2 text-zinc-400">
            Create a new inventory item.
          </p>
        </div>

        <ProductForm />
      </div>
    </AppShell>
  );
}