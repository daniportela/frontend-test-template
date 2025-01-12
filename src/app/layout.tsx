import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import dynamic from "next/dynamic";

// Components
import Image from "next/image";

// Disable SSR for LocalStorage provider, given that Local Storage only exists in the client
const LocalStorageProvider = dynamic(() => import("@/lib/LocalStorageProvider"), { ssr: false });

const archivo = Archivo({ subsets: ["latin"] });

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
      <body className={archivo.className}>
        <header className="w-full bg-gray-light min-h-[50px] px-24 flex items-center justify-between">
          <Link href="/">GamerShop</Link>
          <Link href="/cart">Cart</Link>
        </header>

        <LocalStorageProvider>
          {children}
        </LocalStorageProvider>

      <footer className="bg-gray-dark min-h-[150px] grid place-content-center">
        <Link href="/">
          <Image
            src="/logo_full.svg"
            width={170}
            height={140}
            alt="Apply Digital"
          />
        </Link>
      </footer>
      </body>
    </html>
  );
}
