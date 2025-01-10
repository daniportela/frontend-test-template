import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

import LocalStorageProvider from "@/utils/LocalStorageProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Apply Digital Test",
  description: "Frontend development test for Apply Digital",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="w-full bg-gray-light min-h-[50px] d-flex items-center">
          <Link href="/">GamerShop</Link>
          <Link href="/cart">Cart</Link>
        </header>

        <LocalStorageProvider>
          {children}
        </LocalStorageProvider>
      </body>
    </html>
  );
}
