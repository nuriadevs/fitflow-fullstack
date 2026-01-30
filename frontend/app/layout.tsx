import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/styles/globals.css";
import { getUser } from "./lib/auth/get-user";
import Navbar from "./components/ui/button/navbar/Navbar";
import Footer from "./components/layout/footer";
import { ToastProvider } from '@/components/providers/toast-provider'; 

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FitFlow Personal Trainer",
  description: "Your Personal Fitness Trainer App",
};

export const dynamic = 'force-dynamic';

export default async function RootLayout({ children, }: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getUser();


  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}>
        <header>
          <Navbar user={user}  />
        </header>
        <main className="flex-1">
          {children}
        </main>
         <Footer />
         <ToastProvider />
      </body>
    </html>
  );
}
