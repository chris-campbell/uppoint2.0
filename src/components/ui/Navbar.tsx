"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import Logo from "@/assets/logo.svg";
import { Button } from "../elements/button";
import { getFirstName } from "@/lib/user";
import { Session } from "next-auth";

// Reusable avatar fallback logic
const getAvatar = (session: Session) =>
  (session && session.user && session.user.image) ||
  "https://api.dicebear.com/7.x/thumbs/svg?seed=guest&randomizeIds=false";

export const Navbar = () => {
  const { data: session, status } = useSession();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted || status === "loading") return null;

  const isAuthenticated = !!session?.user;

  return (
    <nav className="w-full border-b p-4" aria-label="Main Navigation">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <Link href="/" className="flex items-center">
          <Logo className="w-28 h-10" />
        </Link>

        <ul className="flex items-center space-x-4">
          {isAuthenticated ? (
            <li className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <p>
                  Hi,{" "}
                  <span className="capitalize">
                    {getFirstName(session.user?.name)}
                  </span>
                </p>
                <Image
                  src={getAvatar(session)}
                  width={30}
                  height={30}
                  alt={session?.user?.name || "User avatar"}
                  className="rounded-full"
                />
              </div>
              <Button onClick={() => signOut()}>Log out</Button>
            </li>
          ) : (
            <li>
              <Button onClick={() => signIn("google")}>
                Sign in with Google
              </Button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};
