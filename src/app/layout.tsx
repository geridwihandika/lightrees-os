import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Lightrees OS",
  description: "Management Hub",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light">
      <body className={`${inter.variable} font-sans bg-background text-on-background font-body-md min-h-screen flex antialiased`}>
        {children}
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
