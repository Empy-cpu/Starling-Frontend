// src/app/layout.tsx

import type { Metadata } from "next";
import LayoutWrapper from "./layout-wrapper";
import ThemeRegistry from "@/Components/ThemeRegistry/ThemeRegistry"; 
import GoogleAnalytics from "@/Components/Analytics/GoogleAnalytics";
import "./globals.css";

export const metadata: Metadata = {
  title: "Starling Cleaners",
  description: "Professional Cleaning Services in Melbourne",
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <GoogleAnalytics />
      </head>
      <body>
        <ThemeRegistry>
          <LayoutWrapper>{children}</LayoutWrapper>
        </ThemeRegistry>
      </body>
    </html>
  );
}
