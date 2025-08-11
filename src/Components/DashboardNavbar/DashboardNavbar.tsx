"use client";

import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  ListItemIcon,
} from "@mui/material";
import { Logout, ExpandMore } from "@mui/icons-material";
import { getCurrentUser, logoutUser } from "@/services/Auth/auth";
import { navbarStyles } from "./dashboard-navbar-styles";

interface DashboardNavbarProps {
  onLogout: () => void;
  onNavigateToHome: () => void;
}

export default function DashboardNavbar({
  onLogout,
  onNavigateToHome,
}: DashboardNavbarProps) {
  const [user, setUser] = useState<{
    firstName: string;
    email: string;
  } | null>(null);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    async function fetchUser() {
      try {
        const currentUser = await getCurrentUser();
        const [firstName] = currentUser.name?.split(" ") ?? ["User"];
        setUser({
          firstName,
          email: currentUser.email,
        });
      } catch (err) {
        console.error("Failed to fetch user", err);
        setUser(null);
      }
    }

    fetchUser();
  }, []);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    handleClose();
    try {
      await logoutUser();
      onLogout();
      
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  if (!user) return null;

  return (
    <AppBar position="fixed" elevation={1} sx={navbarStyles.appBar}>
      <Container maxWidth="xl">
        <Toolbar sx={navbarStyles.toolbar}>
          <Box>
            <Typography onClick={onNavigateToHome} sx={navbarStyles.logo}>
              Starling Cleaners
            </Typography>
          </Box>

          <Box sx={{ flexGrow: 1 }} />

          <Box>
            <Button
              onClick={handleClick}
              endIcon={<ExpandMore />}
              sx={navbarStyles.userButton}
              aria-controls={open ? "user-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              <Avatar sx={navbarStyles.avatar}>
                {user.firstName?.[0] ?? "U"}
              </Avatar>
              <Box sx={navbarStyles.userInfo}>
                <Typography sx={navbarStyles.welcomeText}>
                  Welcome back, {user.firstName}
                </Typography>
                <Typography sx={navbarStyles.emailText}>
                  {user.email}
                </Typography>
              </Box>
            </Button>

            <Menu
              id="user-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              PaperProps={{ sx: navbarStyles.menuPaper }}
              disableScrollLock={true}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <Box sx={navbarStyles.menuHeader}>
                <Avatar sx={navbarStyles.menuAvatar}>
                  {user.firstName?.[0] ?? "U"}
                </Avatar>
                <Box sx={navbarStyles.menuUserInfo}>
                  <Typography sx={navbarStyles.menuUserName}>
                    {user.firstName}
                  </Typography>
                  <Typography sx={navbarStyles.menuUserEmail}>
                    {user.email}
                  </Typography>
                </Box>
              </Box>

              <Divider sx={navbarStyles.menuDivider} />

              <MenuItem onClick={handleLogout} sx={navbarStyles.logoutItem}>
                <ListItemIcon>
                  <Logout sx={navbarStyles.logoutIcon} />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
