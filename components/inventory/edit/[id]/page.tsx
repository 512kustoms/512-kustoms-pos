import AppShell from "@/components/layout/appshell";
import ProductForm from "@/components/inventory/productForm";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditProductPage({
  params,
}: Props) {
  const { id } = await params;

  const product = await prisma.product.findUnique({
    where: {
      id: Number(id),
    },
  });

  if (!product) {
    notFound();
  }

  return (
    <AppShell>
      <div className="space-y-6">

        <div>

          <h1 className="text-4xl font-bold text-white">
            Edit Product
          </h1>

          <p className="mt-2 text-zinc-400">
            Update product information.
          </p>

        </div>

        <ProductForm product={product} />

      </div>
    </AppShell>
  );
}