import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PixelPerfect",
  description: "AI-Powered Image Enhancement and Transformation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider appearance={{}}>
      <html lang="en">
        <body className={inter.className}>
          <Toaster richColors />
          <main>{children}</main>
        </body>
      </html>
    </ClerkProvider>
  );
}
