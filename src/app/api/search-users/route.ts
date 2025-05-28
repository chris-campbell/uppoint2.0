// app/api/search-users/route.ts
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const search = req.nextUrl.searchParams.get("q") || "";

  if (search.length === 0) {
    return NextResponse.json([]);
  }

  const users = await prisma.user.findMany({
    where: {
      name: {
        contains: search,
        mode: "insensitive",
      },
    },
    take: 10,
  });

  return NextResponse.json(users);
}
