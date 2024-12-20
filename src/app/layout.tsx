import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Your Name - Software Engineer",
  description: "Portfolio website showcasing my software engineering projects and skills",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="dark">
      <body className={`${inter.className} bg-base-100 text-base-content min-h-screen`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
