// src/app/layout.tsx

import type { Metadata } from "next";
import LayoutWrapper from "./layout-wrapper";
import ThemeRegistry from "@/Components/ThemeRegistry/ThemeRegistry"; 
import "./globals.css";

export const metadata: Metadata = {
  title: "Starling Cleaners",
  description: "Professional Cleaning Services in Melbourne",
  icons: {
    icon: '/starling-icon.ico',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/starling-icon.ico" />
      </head>
      <body>
        <ThemeRegistry>
          <LayoutWrapper>{children}</LayoutWrapper>
        </ThemeRegistry>
      </body>
    </html>
  );
}
