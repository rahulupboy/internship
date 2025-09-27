import type React from "react";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Analytics } from "@vercel/analytics/next";
import { AppProvider } from "@/lib/store"; // ✅ FIXED
import { Suspense } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "InternMatch - Find Your Perfect Internship",
  description:
    "Personalized internship recommendations based on your skills, location, and interests.",
  generator: "v0.app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <Suspense fallback={null}>
          <AppProvider>{children}</AppProvider>
        </Suspense>

        <Analytics />
      </body>
    </html>
  );
}
