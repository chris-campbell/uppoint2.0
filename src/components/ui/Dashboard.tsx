"use client";

import React, { useState, useEffect } from "react";
// import { useUserSearch } from "@/hooks/useUserSearch";
import pusherClient from "@/lib/pusher";
import { useSession } from "next-auth/react";
import ConversationsList from "../ConversationsList";

export default function Dashboard() {
  const [messages, setMessages] = useState<string[]>([]);
  const { data: session } = useSession();
  const userId = session?.user?.id;

  useEffect(() => {
    if (!userId) return;

    const channel = pusherClient.subscribe(`private-user-${userId}`);

    channel.bind("new-message", (data: { content: string }) => {
      setMessages((prev) => [...prev, data.content]);
    });

    return () => {
      pusherClient.unsubscribe(`private-user-${userId}`);
    };
  }, [messages, userId]);

  return (
    <main>
      <section className="flex">
        <ConversationsList />
        <div>Conversation Panel</div>
      </section>
    </main>
  );
}
