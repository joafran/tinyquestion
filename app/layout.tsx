import type { Metadata } from "next";
import { Bitcount_Single } from "next/font/google";
import "./globals.css";

const bitcountSingle = Bitcount_Single({
  variable: "--font-bitcount-single",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PlayAsk",
  description: "Make asking a fun and engaging experience.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className={`${bitcountSingle.variable}`}>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
