import type { Metadata } from "next";
import { Bitcount_Single } from "next/font/google";
import "./globals.css";

const bitcountSingle = Bitcount_Single({
  variable: "--font-bitcount-single",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tiny Question App",
  description: "Ask questions in a fun and engaging way",
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
