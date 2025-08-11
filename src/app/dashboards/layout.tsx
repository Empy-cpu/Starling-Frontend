"use client";

import React, { useEffect, useState } from "react";
import {
  ThemeProvider,
  CssBaseline,
  Box,
  styled,
} from "@mui/material";
import { createTheme, Theme } from "@mui/material/styles";
import DashboardNavbar from "@/Components/DashboardNavbar/DashboardNavbar";
import { getCurrentUser } from "@/services/Auth/auth";
import { useRouter } from "next/navigation";

// Styled main content area
const MainContent = styled(Box)(({ theme }: { theme: Theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  marginTop: "64px",
  minHeight: "calc(100vh - 64px)",
  backgroundColor: theme.palette.background.default,
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(2),
    marginTop: "56px",
    minHeight: "calc(100vh - 56px)",
  },
}));

// ✅ Must match Next.js expectations for layout.tsx
interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const defaultTheme = createTheme();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const checkAuth = async () => {
      try {
        await getCurrentUser();
      } catch {
        router.push("/auth/login");
      }
    };

    checkAuth();
  }, [mounted, router]);

  const handleLogout = () => {
    router.push("/auth/login");
  };

  const handleNavigateToHome = () => {
    router.push("/");
  };

  if (!mounted) return null;

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Box className="dashboard-layout" sx={{ display: "flex", minHeight: "100vh" }}>
        <Box
          sx={{
            position: "fixed",
            width: "100%",
            zIndex: (theme: Theme) => theme.zIndex.drawer + 1,
          }}
        >
          <DashboardNavbar
            onLogout={handleLogout}
            onNavigateToHome={handleNavigateToHome}
          />
        </Box>
        <MainContent>{children}</MainContent>
      </Box>
    </ThemeProvider>
  );
}
