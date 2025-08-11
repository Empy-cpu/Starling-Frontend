"use client";

import React, { useEffect, useState } from "react";
import { useClient } from "@/hooks/use-client";
import Link from "next/link";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  IconButton,
  useMediaQuery,
  useTheme,
  Drawer,
  List,
  ListItem,
  Divider,
  Menu,
  MenuItem,
} from "@mui/material";
import {
  Phone,
  Person,
  Menu as MenuIcon,
  Close as CloseIcon,
  ExpandMore,
  ContactMail,
  AttachMoney,
 
  Star,
} from "@mui/icons-material";

import { getCurrentUser } from "@/services/Auth/auth";
import "./NavBar.css";

interface AuthenticatedUser {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  isVerified?: boolean;
}

export default function Navbar() {
  const isClient = useClient();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));

  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesAnchor, setServicesAnchor] = useState<null | HTMLElement>(
    null
  );
  const [helpAnchor, setHelpAnchor] = useState<null | HTMLElement>(null);
  const [user, setUser] = useState<AuthenticatedUser | null>(null);
  const [mounted, setMounted] = useState(false); // ✅ Prevent hydration mismatch

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentUser = await getCurrentUser();
        setUser({
          firstName: currentUser.name.split(" ")[0] || "",
          lastName: "",
          email: "",
          role: currentUser.role,
        });
      } catch {
        setUser(null);
      } finally {
        setMounted(true); // ✅ Prevent hydration mismatch
      }
    };

    fetchUser();
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleServicesClick = (event: React.MouseEvent<HTMLElement>) => {
    setServicesAnchor(event.currentTarget);
  };

  const handleServicesClose = () => {
    setServicesAnchor(null);
  };

  const handleHelpClick = (event: React.MouseEvent<HTMLElement>) => {
    setHelpAnchor(event.currentTarget);
  };

  const handleHelpClose = () => {
    setHelpAnchor(null);
  };

  // Function to handle section navigation
  const handleSectionNavigation = (path: string, e: React.MouseEvent) => {
    if (window.location.pathname !== '/') {
      e.preventDefault();
      // Store the hash to navigate to after page load
      sessionStorage.setItem('scrollToSection', path);
      window.location.href = `/${path}`;
    }
  };

  const navigationItems = [
    {
      label: "Services",
      hasDropdown: true,
      dropdownItems: [
        {
          label: "General House Cleaning",
          href: "/services-pages/general-cleaning-page",
        },
        {
          label: "End of Lease Cleaning",
          href: "/services-pages/end-of-lease-cleaning-page",
        },
      ],
    },
   
    { 
      label: "Reviews", 
      href: "#reviews", 
      icon: <Star />,
      onClick: (e: React.MouseEvent) => handleSectionNavigation('#reviews', e)
    },
    { 
      label: "Contact", 
      href: "#contact", 
      icon: <ContactMail />,
      onClick: (e: React.MouseEvent) => handleSectionNavigation('#contact', e)
    },
    { 
      label: "Jobs", 
      href: "#jobs", 
      icon: <AttachMoney />,
      onClick: (e: React.MouseEvent) => handleSectionNavigation('#jobs', e)
    },
    {
      label: "Help",
      hasDropdown: true,
      dropdownItems: [
        { label: "FAQ", href: "/help-portion/faq-page" },
        {
          label: "Terms of Service",
          href: "/help-portion/terms-of-services-page",
        },
      ],
    },
  ];

  const drawer = (
    <Box className="mobile-drawer">
      <Box className="drawer-header">
        <IconButton onClick={handleDrawerToggle}>
          <CloseIcon />
        </IconButton>
      </Box>
      <List>
        <ListItem>
          <Box className="mobile-phone">
            <Phone className="phone-icon" />
            <Typography variant="body2" className="phone-text">
              03 9088 3118
            </Typography>
          </Box>
        </ListItem>
        <Divider className="mobile-divider" />

        {/* Navigation items only - login and book now buttons moved to bottom */}

        <Divider className="mobile-divider" />

        {navigationItems.map((item, index) =>
          item.hasDropdown ? (
            item.dropdownItems.map((subItem, idx) => (
              <ListItem key={`${index}-${idx}`} className="mobile-nav-item">
                <Button component={Link} href={subItem.href} className="mobile-nav-btn">{subItem.label}</Button>
              </ListItem>
            ))
          ) : (
            <ListItem key={index} className="mobile-nav-item">
              <Button 
                component={Link} 
                href={item.href || "#"} 
                className="mobile-nav-btn"
                onClick={item.onClick}
              >
                {item.label}
              </Button>
            </ListItem>
          )
        )}
        <Divider className="mobile-divider" />
        <ListItem>
          {mounted && user ? (
            <Button
              component={Link}
              href={
                user.role === "Admin"
                  ? "/dashboards/admin"
                  : "/dashboards/customer"
              }
              className="mobile-user-text"
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                textTransform: "none",
                color: "#ffffff",
                width: "100%",
                textAlign: "left",
                padding: "12px 16px"
              }}
            >
              <Box component="span" sx={{ fontWeight: 700 }}>My Account</Box>
              <Box component="span" sx={{ fontSize: '0.85rem', opacity: 0.8 }}>
                {user.firstName} {user.lastName}
              </Box>
              <Box component="span" sx={{ fontSize: '0.75rem', opacity: 0.7 }}>
                {user.email}
              </Box>
            </Button>
          ) : (
            <Button
              component={Link}
              href="/auth/login"
              className="mobile-login-btn"
              startIcon={<Person />}
              sx={{
                width: '100%',
                justifyContent: 'flex-start',
                color: '#ffffff',
                textTransform: 'none',
                padding: '12px 16px',
                borderRadius: '8px',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                },
              }}
            >
              Log In / Sign Up
            </Button>
          )}
        </ListItem>

        <ListItem>
          <Button
            component={Link}
            href="/booking"
            variant="contained"
            className="mobile-book-btn"
          >
            Book Now
          </Button>
        </ListItem>
      </List>
    </Box>
  );

  // Add effect to handle scroll to section after page load
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const scrollToSection = sessionStorage.getItem('scrollToSection');
      if (scrollToSection) {
        const element = document.querySelector(scrollToSection);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
        sessionStorage.removeItem('scrollToSection');
      }
    }
  }, []);

  return (
    <>
      <AppBar position="fixed" elevation={1} className="navbar">
        <Container maxWidth="xl">
          <Toolbar className="toolbar">
            <Link href="/" passHref>
              <Box className="logo-section" sx={{ cursor: "pointer" }}>
                <div className="logo-image" />
              </Box>
            </Link>

            {isClient &&
              (isMobile ? (
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="start"
                  onClick={handleDrawerToggle}
                  className="mobile-menu-btn"
                >
                  <MenuIcon />
                </IconButton>
              ) : (
                <>
                  <Box className="desktop-nav-menu">
                    {navigationItems.map((item, index) => (
                      <Box key={index} className="nav-item-container">
                        {item.hasDropdown ? (
                          <>
                            <Button
                              className="nav-item"
                              endIcon={<ExpandMore />}
                              onClick={
                                item.label === "Services"
                                  ? handleServicesClick
                                  : handleHelpClick
                              }
                            >
                              {item.label}
                            </Button>
                            <Menu
                              anchorEl={
                                item.label === "Services"
                                  ? servicesAnchor
                                  : helpAnchor
                              }
                              open={Boolean(
                                item.label === "Services"
                                  ? servicesAnchor
                                  : helpAnchor
                              )}
                              onClose={
                                item.label === "Services"
                                  ? handleServicesClose
                                  : handleHelpClose
                              }
                              className="services-dropdown"
                              disableScrollLock={true}
                            >
                              {item.dropdownItems?.map((subItem, idx) => (
                                <MenuItem
                                  key={idx}
                                  component={Link}
                                  href={subItem.href}
                                  onClick={
                                    item.label === "Services"
                                      ? handleServicesClose
                                      : handleHelpClose
                                  }
                                >
                                  {subItem.label}
                                </MenuItem>
                              ))}
                            </Menu>
                          </>
                        ) : (
                          <Button 
                            component={Link} 
                            href={item.href || "#"} 
                            className="nav-item"
                            onClick={item.onClick}
                          >
                            {item.label}
                          </Button>
                        )}
                      </Box>
                    ))}
                  </Box>

                  <Box className="desktop-nav-actions">
                    <Box className="phone-section">
                      <Phone className="phone-icon" />
                      <Typography variant="body2" className="phone-number">
                        <a
                          href="https://wa.me/61390883118"
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ textDecoration: "none", color: "inherit" }}
                        >
                          03 9088 3118
                        </a>
                      </Typography>
                    </Box>

                    {/* ✅ User welcome message with icon */}
                    {mounted && user ? (
                      <Button
                        component={Link}
                        href={
                          user.role === "Admin"
                            ? "/dashboards/admin"
                            : "/dashboards/customer"
                        }
                        className="welcome-message"
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-start",
                          textTransform: "none",
                          fontWeight: 500,
                        }}
                      >
                        <Typography variant="caption"></Typography>
                        <Box display="flex" alignItems="center">
                          <Person fontSize="small" sx={{ mr: 0.5 }} />
                          <Typography variant="body2">
                            {user.firstName}
                          </Typography>
                        </Box>
                      </Button>
                    ) : (
                      <Button
                        component={Link}
                        href="/auth/login"
                        startIcon={<Person />}
                        className="login-btn"
                      >
                        Log In
                      </Button>
                    )}

                    <Button
                      component={Link}
                      href="/booking"
                      variant="contained"
                      className="book-now-btn"
                    >
                      Book Now
                    </Button>
                  </Box>
                </>
              ))}
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true, disableScrollLock: true }}
        className="mobile-drawer-container"
      >
        {drawer}
      </Drawer>
    </>
  );
}
