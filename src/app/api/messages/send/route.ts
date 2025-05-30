import { NextResponse } from "next/server";
import Pusher from "pusher";
import { auth } from "../../../../../auth";
import { prisma } from "@/lib/prisma";

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID!,
  key: process.env.NEXT_PUBLIC_PUSHER_APP_KEY!,
  secret: process.env.PUSHER_APP_SECRET!,
  cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
  useTLS: true,
});

export async function POST(req: Request) {
  const { content, recipientId } = await req.json();

  const session = await auth();

  if (!session?.user?.email) {
    return new Response("Unauthorized", { status: 401 });
  }

  const sender = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!sender) {
    return new Response("Sender not found", { status: 404 });
  }

  const message = await prisma.message.create({
    data: {
      content,
      senderId: sender.id,
      recipientId,
    },
  });

  // Trigger Pusher event to recipient
  await pusher.trigger(`private-user-${recipientId}`, "new-message", {
    id: message.id,
    content: message.content,
    senderId: sender.id,
    recipientId,
    createdAt: message.createdAt,
  });

  return NextResponse.json({ success: true });
}
