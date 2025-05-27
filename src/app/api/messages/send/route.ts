import { NextResponse } from "next/server";
import Pusher from "pusher";
import { auth } from "../../../../../auth";
import { json } from "stream/consumers";
import { prisma } from "@/lib/prisma";

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID!,
  key: process.env.NEXT_PUBLIC_PUSHER_APP_KEY!,
  secret: process.env.PUSHER_APP_SECRET!,
  cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
  useTLS: true,
});

export async function POST(req: Request) {
  // const { message } = await request.json();

  const { content, recipient, recipientId } = await req.json();

  const session = await auth();

  const sender = await prisma.user.findUnique({
    where: { email: session?.user?.email },
  });

  if (!sender) {
    return new Response("Sender not found", { status: 401 });
  }

  const message = await prisma.message.create({
    data: {
      content: content,
      senderId: sender.id,
      recipientId: recipientId,
      recipient: recipient,
    },
  });

  await pusher.trigger(`private-member-${recipientId}`, "new-member", {
    id: message.id,
    text: content,
    senderId: sender.id,
    createdAt: message.createdAt,
  });

  return NextResponse.json({ success: true });
}
