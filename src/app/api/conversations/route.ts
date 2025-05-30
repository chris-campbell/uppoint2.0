// GET /api/conversations
import { auth } from "../../../../auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) return new Response("Unauthorized", { status: 401 });

  // Get the latest message from each unique user you've chatted with
  const messages = await prisma.message.findMany({
    where: {
      OR: [
        { senderId: userId },
        { recipientId: userId },
      ],
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      sender: true,
      recipient: true,
    },
  });

  const uniqueConversations: { [key: string]: typeof messages[0] } = {};
  for (const message of messages) {
    const otherId = message.senderId === userId ? message.recipientId : message.senderId;
    if (!uniqueConversations[otherId]) {
      uniqueConversations[otherId] = message;
    }
  }

  return NextResponse.json(Object.values(uniqueConversations));
}
