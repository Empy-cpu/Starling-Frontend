"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/Components/NavBar/Navbar";
import Footer from "@/Components/Footer/Footer";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthPage = pathname?.startsWith("/auth");
  const isDashboardPage = pathname?.startsWith("/dashboards");

  const showGlobalLayout = !isAuthPage && !isDashboardPage;

  return (
    <>
      {showGlobalLayout && <Navbar />}
      <main>{children}</main>
      {showGlobalLayout && <Footer />}
    </>
  );
}
