import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI Agent Gmail Automation Dashboard",
  description: "A centralized dashboard for monitoring and managing email outreach, follow-ups, and AI-generated tasks.",
};

// AuthGuard is now a client component
import AuthGuard from './AuthGuard';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <AuthGuard>{children}</AuthGuard>
      </body>
    </html>
  );
}
