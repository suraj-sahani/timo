import { TimezoneDetector } from "@/components/timezone-detector";
import AppProviders from "@/providers/app-provider";
import { SanityLive } from "@/sanity/lib/live";
import type { Metadata } from "next";
import { Lexend } from "next/font/google";
import "./globals.css";

const lexend = Lexend({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Timo",
  description: "Seemless scheduling of meetings with Timo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AppProviders>
      <html lang="en">
        <body className={`${lexend.className}  antialiased`}>
          {children}
          <SanityLive />
          <TimezoneDetector />
        </body>
      </html>
    </AppProviders>
  );
}
