import { NextResponse } from "next/server";
import Pusher from "pusher";
import { auth } from "../../../../../auth";

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID!,
  key: process.env.NEXT_PUBLIC_PUSHER_APP_KEY!,
  secret: process.env.PUSHER_APP_SECRET!,
  cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
  useTLS: true,
});

export async function POST(req: Request) {
  const session = await auth();

  if (!session?.user?.id) {
    return new Response("Unauthorized", { status: 401 });
  }

  const formData = await req.text(); // ← grab the raw body
  const params = new URLSearchParams(formData); // ← parse it

  const socketId = params.get("socket_id")!;
  const channelName = params.get("channel_name")!;

  const authResponse = pusher.authorizeChannel(socketId, channelName);
  return NextResponse.json(authResponse);
}
