// src/Components/NavBar/navbar-styles.ts

import { styled } from "@mui/material/styles";
import { AppBar, Box, Button, IconButton, Toolbar } from "@mui/material";

// Top-level AppBar styling
export const StyledAppBar = styled(AppBar)(() => ({
  backgroundColor: "#FEFBF2",
  boxShadow: "none",
  borderBottom: "1px solid #E0E0E0",
}));

// Logo section
export const LogoSection = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  flexShrink: 0,
  minWidth: 120,
  cursor: "pointer",
}));

// Navigation buttons
export const NavItemButton = styled(Button)(() => ({
  color: "#023362",
  textTransform: "none",
  fontWeight: "bold",
  padding: "5px 13px",
  borderRadius: 4,
  fontSize: "0.95rem",
  transition: "all 0.3s ease",
  "&:hover": {
    backgroundColor: "#74BD576f",
    color: "#023362",
  },
}));

// Toolbar for layout
export const StyledToolbar = styled(Toolbar)(() => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "8px 16px",
}));

// Auth section (right-side of navbar)
export const AuthSection = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  gap: "16px",
}));

// Mobile menu icon button
export const MobileMenuButton = styled(IconButton)(() => ({
  display: "none",
  "@media (max-width: 960px)": {
    display: "inline-flex",
  },
}));
