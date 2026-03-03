import type { Metadata } from "next";
import "./globals.css";
import StarBackground from "@/components/StarBackground";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "星野 Hoshino — Night Sky Photography",
    template: "%s | 星野 Hoshino",
  },
  description:
    "A photography blog celebrating the night sky — Milky Way, auroras, star trails, and the infinite beauty above us.",
  keywords: ["astrophotography", "night sky", "milky way", "aurora", "stars", "photography blog"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <StarBackground />
        <div className="relative z-10 flex flex-col min-h-screen">
          <Navigation />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
