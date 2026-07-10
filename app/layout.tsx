import type { Metadata } from "next";
import "./globals.css";
import ConditionalStarBackground from "@/components/ConditionalStarBackground";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ThemeProvider from "@/components/ThemeProvider";

export const metadata: Metadata = {
  title: "星野 Hoshino",
  description: "A travel photo journal.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <ThemeProvider />
        <ConditionalStarBackground />
        <div className="relative z-10 flex flex-col min-h-screen">
          <Navigation />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
