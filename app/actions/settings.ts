"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

/* ----------------------- BRANDS ----------------------- */

export async function addBrand(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();

  if (!name) return;

  const exists = await prisma.brand.findFirst({
    where: {
      name: {
        equals: name,
        mode: "insensitive",
      },
    },
  });

  if (exists) return;

  await prisma.brand.create({
    data: { name },
  });

  revalidatePath("/settings/brands");
}

export async function updateBrand(formData: FormData) {
  const id = Number(formData.get("id"));
  const name = String(formData.get("name") ?? "").trim();

  if (!id || !name) return;

  const exists = await prisma.brand.findFirst({
    where: {
      name: {
        equals: name,
        mode: "insensitive",
      },
      NOT: {
        id,
      },
    },
  });

  if (exists) return;

  await prisma.brand.update({
    where: { id },
    data: { name },
  });

  revalidatePath("/settings/brands");
}

export async function deleteBrand(formData: FormData) {
  const id = Number(formData.get("id"));

  if (!id) return;

  await prisma.brand.delete({
    where: { id },
  });

  revalidatePath("/settings/brands");
}

/* --------------------- LOCATIONS ---------------------- */

export async function addLocation(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();

  if (!name) return;

  const exists = await prisma.location.findFirst({
    where: {
      name: {
        equals: name,
        mode: "insensitive",
      },
    },
  });

  if (exists) return;

  await prisma.location.create({
    data: { name },
  });

  revalidatePath("/settings/locations");
}

export async function updateLocation(formData: FormData) {
  const id = Number(formData.get("id"));
  const name = String(formData.get("name") ?? "").trim();

  if (!id || !name) return;

  const exists = await prisma.location.findFirst({
    where: {
      name: {
        equals: name,
        mode: "insensitive",
      },
      NOT: {
        id,
      },
    },
  });

  if (exists) return;

  await prisma.location.update({
    where: { id },
    data: { name },
  });

  revalidatePath("/settings/locations");
}

export async function deleteLocation(formData: FormData) {
  const id = Number(formData.get("id"));

  if (!id) return;

  await prisma.location.delete({
    where: { id },
  });

  revalidatePath("/settings/locations");
}