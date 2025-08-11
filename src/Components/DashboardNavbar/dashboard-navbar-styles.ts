// components/DashboardNavbar.styles.ts
import { SxProps, Theme } from "@mui/material";

export const navbarStyles: Record<string, SxProps<Theme>> = {
  appBar: {
    backgroundColor: "#023059",
    color: "#F2EFE9",
    zIndex: 1100,
  },
  toolbar: {
    justifyContent: "space-between",
    padding: { xs: "8px 12px", sm: "8px 16px", xl: "8px 40px" },
    minHeight: { xs: "60px", sm: "70px" },
  },
  logo: {
    fontWeight: 700,
    fontSize: { xs: "1.1rem", sm: "1.25rem", xl: "1.3rem" },
    letterSpacing: 0.5,
    color: "#8BBF65",
    cursor: "pointer",
    textShadow: "0 1px 2px rgba(0, 0, 0, 0.1)",
    transition: "all 0.3s ease",
    "&:hover": {
      color: "#52B3D9",
      transform: "scale(1.05)",
    },
  },
  userButton: {
    display: "flex",
    alignItems: "center",
    gap: 2,
    padding: { xs: "6px 12px", sm: "8px 16px", xl: "10px 20px" },
    minWidth: { xs: 180, sm: 250, xl: 280 },
    borderRadius: 2,
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    border: "1px solid rgba(138, 191, 101, 0.4)",
    color: "#F2EFE9",
    textTransform: "none",
    transition: "all 0.3s ease",
    justifyContent: "flex-start",
    "&:hover": {
      backgroundColor: "rgba(138, 191, 101, 0.15)",
      borderColor: "#8BBF65",
    },
  },
  avatar: {
    background: "linear-gradient(135deg, #8BBF65, #52B3D9)",
    color: "#023059",
    fontWeight: 700,
    width: { xs: 32, sm: 40, xl: 45 },
    height: { xs: 32, sm: 40, xl: 45 },
    fontSize: { xs: "0.8rem", sm: "1rem", xl: "1.1rem" },
    boxShadow: "0 2px 8px rgba(138, 191, 101, 0.3)",
  },
  userInfo: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
  },
  welcomeText: {
    fontWeight: 600,
    fontSize: { xs: "0.85rem", sm: "0.95rem", xl: "1rem" },
    color: "#F2EFE9",
    lineHeight: 1.2,
  },
  emailText: {
    fontSize: { xs: "0.7rem", sm: "0.8rem", xl: "0.85rem" },
    color: "rgba(255, 255, 255, 0.8)",
  },
  menuPaper: {
    mt: 1,
    borderRadius: 2,
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.15)",
    backgroundColor: "#ffffff",
    border: "1px solid rgba(138, 191, 101, 0.2)",
    minWidth: 280,
  },
  menuHeader: {
    display: "flex",
    alignItems: "center",
    gap: 2,
    px: 2.5,
    py: 2,
    background: "linear-gradient(135deg, rgba(138, 191, 101, 0.05), rgba(138, 191, 101, 0.02))",
  },
  menuAvatar: {
    background: "linear-gradient(135deg, #8BBF65, #52B3D9)",
    color: "#023059",
    fontWeight: 700,
    width: 45,
    height: 45,
    fontSize: "1.1rem",
    boxShadow: "0 2px 8px rgba(138, 191, 101, 0.3)",
  },
  menuUserInfo: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
  },
  menuUserName: {
    fontWeight: 600,
    color: "#023859",
    fontSize: "1rem",
    lineHeight: 1.2,
  },
  menuUserEmail: {
    color: "#999",
    fontSize: "0.85rem",
    lineHeight: 1.2,
  },
  menuDivider: {
    backgroundColor: "rgba(138, 191, 101, 0.2)",
  },
  logoutItem: {
    px: 2.5,
    py: 1.5,
    color: "#f44336",
    "&:hover": {
      backgroundColor: "rgba(244, 67, 54, 0.1)",
      color: "#f44336",
    },
  },
  logoutIcon: {
    color: "#f44336",
  },
};
