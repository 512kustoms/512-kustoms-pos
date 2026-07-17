import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("q")?.trim() ?? "";

  if (!query) {
    return NextResponse.json({
      products: [],
      customers: [],
    });
  }

  const [products, customers] = await Promise.all([
    prisma.product.findMany({
      where: {
        OR: [
          {
            name: {
              contains: query,
              mode: "insensitive",
            },
          },
          {
            category: {
              contains: query,
              mode: "insensitive",
            },
          },
          {
            supplier: {
              contains: query,
              mode: "insensitive",
            },
          },
          {
            brand: {
              is: {
                name: {
                  contains: query,
                  mode: "insensitive",
                },
              },
            },
          },
        ],
      },

      include: {
        brand: true,
        location: true,
      },

      orderBy: {
        name: "asc",
      },

      take: 10,
    }),

    prisma.customer.findMany({
      where: {
        OR: [
          {
            firstName: {
              contains: query,
              mode: "insensitive",
            },
          },
          {
            lastName: {
              contains: query,
              mode: "insensitive",
            },
          },
          {
            phone: {
              contains: query,
              mode: "insensitive",
            },
          },
          {
            email: {
              contains: query,
              mode: "insensitive",
            },
          },
        ],
      },

      orderBy: {
        lastName: "asc",
      },

      take: 10,
    }),
  ]);

  return NextResponse.json({
    products,
    customers,
  });
}