"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Reusable fetch function
  const loadUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/users");
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error("Failed to load users:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  // Add a dummy user
  const addDummyUser = async () => {
    try {
      await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: `user${Date.now()}@example.com`,
          name: "Dummy User",
          image: null,
        }),
      });

      // Refresh user list after adding
      await loadUsers();
    } catch (err) {
      console.error("Failed to create user:", err);
    }
  };

  return <main></main>;
}
