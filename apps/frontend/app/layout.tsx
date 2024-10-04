import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Provider } from "@/components/Provider";
import { AppBar } from "@/components/AppBar";
import Head from "next/head";
import { Notification } from "@/components/Notification";
import { Footer } from "@/components/Footer";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "EduBridge",
  description: "The Bridge Between Freshers And Alumni",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
          <AppBar />
          <div className="absolute flex flex-col top-14 bg-gradient-to-r from-gray-900 via-neutral-950 to-slate-900 w-full h-auto  text-white">
            <div className="flex-1 min-h-svh">{children}</div>
            <Footer />
          </div>
          <Notification />
        </Provider>
      </body>
    </html>
  );
}
