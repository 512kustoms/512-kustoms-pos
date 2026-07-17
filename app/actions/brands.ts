"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function addBrand(formData: FormData) {
  await prisma.brand.create({
    data: {
      name: String(formData.get("name")),
    },
  });

  revalidatePath("/inventory");
}