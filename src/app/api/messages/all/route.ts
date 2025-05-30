import { getAllMessages } from "@/services/messages";

export async function GET() {
    const messages = await getAllMessages();
    return Response.json(messages);
}