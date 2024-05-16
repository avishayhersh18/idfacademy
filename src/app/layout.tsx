"use client";
import "./globals.css";
import { Inter } from "next/font/google";
import Provider from "@/app/_trpc/Provider";
import { SessionProvider } from "next-auth/react";
// import useAppState from "./_contexts/globalContext";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const { theme } = useAppState();

  return (
    <html>
      <body className={inter.className}>
        <SessionProvider>
          <Provider>{children}</Provider>
        </SessionProvider>
      </body>
    </html>
  );
}
