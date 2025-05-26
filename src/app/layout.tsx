import "./globals.css";
import type { Metadata } from "next";
import SessionWrapper from "@/components/utility/SessionWrapper";

export const metadata: Metadata = {
  title: "Uppoint Dashboard",
  description: "Realtime messaging and alert application.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <SessionWrapper>{children}</SessionWrapper>
      </body>
    </html>
  );
}
