"use client";

import { useState, useEffect, useRef } from "react";
import pusherClient from "@/lib/pusher";
import UserSearch from "./Search";
import debounce from "lodash.debounce";

export default function Home() {
  const [messages, setMessages] = useState<string[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [recipient, setRecipient] = useState({});
  const [recipientId, setRecipientId] = useState(0);

  useEffect(() => {
    if (query.trim() === "") {
      setResults([]);
      setShowDropdown(false);
      return;
    }

    const fetchUsers = debounce(async () => {
      const res = await fetch(`/api/search-users?q=${query}`);
      const data = await res.json();
      setResults(data);
      setShowDropdown(true);
    }, 300);

    fetchUsers();
    return () => fetchUsers.cancel();
  }, [query]);

  const submitMessage = async (e: any) => {
    e.preventDefault();

    await fetch("/api/messages/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content: newMessage,
        recipientId: recipientId,
      }),
    });
  };

  // useEffect(() => {
  //   const channel = pusherClient.subscribe("chat-channel");

  //   channel.bind("new-message", (data: { message: string }) => {
  //     setMessages((prev) => [...prev, data.message]);
  //   });

  //   return () => {
  //     pusherClient.unsubscribe("chat-channel");
  //   };
  // }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await fetch("/api/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: newMessage }),
    });

    setNewMessage("");
  };

  return (
    <main className="p-4">
      <h1 className="text-2xl mb-4">Real-Time Message Board</h1>
      <div className="relative p-4 w-full max-w-md">
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => results.length && setShowDropdown(true)}
          onBlur={() => setTimeout(() => setShowDropdown(false), 150)} // delay hides menu AFTER a click
          className="w-full border px-3 py-2 rounded shadow-sm"
          placeholder="Search users..."
          aria-autocomplete="list"
          aria-controls="user-search-dropdown"
          aria-expanded={showDropdown}
          aria-haspopup="listbox"
        />

        {showDropdown && results.length > 0 && (
          <ul
            id="user-search-dropdown"
            role="listbox"
            className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded shadow-md max-h-60 overflow-auto"
          >
            {results.map((user: any, index: number) => (
              <li
                key={user.id}
                role="option"
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onMouseDown={() => {
                  setQuery(user.name); // populate input with selected user
                  setRecipient(user);
                  setRecipientId(user.id);
                  setShowDropdown(false); // close menu
                }}
              >
                {user.name}
              </li>
            ))}
          </ul>
        )}
      </div>
      <form onSubmit={submitMessage} className="mb-4">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="border p-2 mr-2"
          placeholder="Type a message"
        />
        <button type="submit" className="bg-blue-500 text-white p-2">
          Send
        </button>
      </form>
      <ul>
        {messages.map((message, index) => (
          <li key={index} className="mb-2">
            {message}
          </li>
        ))}
      </ul>
    </main>
  );
}
