import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "./_components/header";
import AuthProvider from "./_providers/auth";
import "./globals.css";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FCM + NEXTJS Login App",
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
            <Toaster />
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}
