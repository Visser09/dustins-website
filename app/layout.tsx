import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dustin Visser | Stand-up comic",
  description: "Official site of Ontario stand-up comic Dustin Visser. Upcoming shows, booking, and tour dates.",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
