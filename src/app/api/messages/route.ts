import { NextResponse } from "next/server";
import Pusher from "pusher";
import { auth } from "../../../../auth";

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID!,
  key: process.env.NEXT_PUBLIC_PUSHER_APP_KEY!,
  secret: process.env.PUSHER_APP_SECRET!,
  cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
  useTLS: true,
});

export async function GET() {
  // const { message } = await request.json();

  const session = await auth();

  console.log(session?.user?.email);
  if (!session?.user?.email) {
    return new Response("Unauthorized", { status: 401 });
  }
  // await pusher.trigger("chat-channel", "new-message", {
  //   message,
  // });

  return NextResponse.json({ success: false });
}
