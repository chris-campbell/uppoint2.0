import { prisma } from "@/lib/prisma";

export async function getAllMessages() {
  return await prisma.message.findMany({
    orderBy: {
      createdAt: "asc",
    },
  });
}
