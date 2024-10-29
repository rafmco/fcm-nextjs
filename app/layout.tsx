import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "./_components/header";
import AuthProvider from "./_providers/auth";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Login NextAuth App",
  description: "Criado por Rafael Machado",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <Header />
          <main className="flex justify-center items-start p-6 min-h-screen bg-white">
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}
