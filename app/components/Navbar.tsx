// //path-->app/components/Navbar.tsx

"use client";

import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  useMediaQuery,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";

import {
  Menu as MenuIcon,
  ArrowBack as ArrowBackIcon,
  AccountCircle as AccountCircleIcon,
  Settings as SettingsIcon,
  Lock as LockIcon,
  Delete as DeleteIcon,
  Logout as LogoutIcon,
  DarkMode as DarkModeIcon,
} from "@mui/icons-material";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const isMobile = useMediaQuery("(max-width:768px)");

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [user, setUser] = useState<null | {
    fullName: string;
    email: string;
    phone: string;
    role: string;
  }>(null);

  const showBackButton = pathname !== "/";
  const openMenu = Boolean(anchorEl);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/user/me", { credentials: "include" });
        if (!res.ok) {
          setUser(null);
          return;
        }

        const data = await res.json();
        setUser(data.user);
      } catch (err) {
        console.error("Error fetching user", err);
        setUser(null);
      }
    };

    fetchUser();
  }, [pathname]); // كل ما تغيّرت الصفحة، أعد الفحص

  const isLoggedIn = !!user;
  const isEntrepreneur = user?.role === "entrepreneur";

  const navItems = [
    { label: "الرئيسية", path: "/components/home" },
    { label: "من نحن", path: "/components/NavbarComponents/about" },
    { label: "التوثيق", path: "/components/NavbarComponents/docs" },
    {
      label: "المدونة",
      path: "/components/NavbarComponents/blog",
      disabled: !isLoggedIn,
    },
    {
      label: "كورسات",
      path: "/dashboard/entrepreneur/courses",
      disabled: !(isLoggedIn && isEntrepreneur),
    },
  ];

  const handleNavigate = (path: string) => {
    router.push(path);
    setDrawerOpen(false);
    setAnchorEl(null);
  };

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          direction: "rtl",
          background: "#111",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            {isMobile ? (
              <IconButton color="inherit" onClick={() => setDrawerOpen(true)}>
                <MenuIcon />
              </IconButton>
            ) : (
              navItems.map((item) => (
                <Button
                  key={item.path}
                  color="inherit"
                  onClick={() => handleNavigate(item.path)}
                  disabled={item.disabled}
                >
                  {item.label}
                </Button>
              ))
            )}
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography variant="h6" fontWeight="bold" color="blue">
              رؤية وتمويل
            </Typography>

            {showBackButton && (
              <IconButton color="inherit" onClick={() => router.back()}>
                <ArrowBackIcon />
              </IconButton>
            )}

            {isLoggedIn && (
              <>
                <Tooltip title="إعدادات الحساب">
                  <IconButton
                    color="inherit"
                    onClick={(e) => setAnchorEl(e.currentTarget)}
                  >
                    <AccountCircleIcon />
                  </IconButton>
                </Tooltip>
                <Menu
                  anchorEl={anchorEl}
                  open={openMenu}
                  onClose={() => setAnchorEl(null)}
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                  transformOrigin={{ vertical: "top", horizontal: "right" }}
                >
                  <MenuItem
                    onClick={() =>
                      handleNavigate(
                        "/components/NavbarComponents/account-settings/general-settings"
                      )
                    }
                  >
                    <SettingsIcon fontSize="small" sx={{ ml: 1 }} />
                    إعدادات الحساب
                  </MenuItem>
                  <MenuItem
                    onClick={() =>
                      handleNavigate(
                        "/components/NavbarComponents/account-settings/password-settings"
                      )
                    }
                  >
                    <LockIcon fontSize="small" sx={{ ml: 1 }} />
                    تغيير كلمة المرور
                  </MenuItem>
                  <MenuItem
                    onClick={() =>
                      handleNavigate(
                        "/components/NavbarComponents/account-settings/delete-settings"
                      )
                    }
                  >
                    <DeleteIcon fontSize="small" sx={{ ml: 1 }} />
                    حذف الحساب
                  </MenuItem>
                  <MenuItem
                    onClick={() =>
                      handleNavigate(
                        "/components/NavbarComponents/account-settings/logout-settings"
                      )
                    }
                  >
                    <LogoutIcon fontSize="small" sx={{ ml: 1 }} />
                    تسجيل الخروج
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      handleNavigate(
                        "/components/NavbarComponents/account-settings/theme-settings"
                      );
                    }}
                  >
                    <DarkModeIcon fontSize="small" sx={{ ml: 1 }} />
                    تغيير الثيم
                  </MenuItem>
                </Menu>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <List sx={{ width: 250, marginTop: "50px" }}>
          {navItems.map((item) => (
            <ListItem key={item.path} disablePadding>
              <ListItemButton
                disabled={item.disabled}
                onClick={() => handleNavigate(item.path)}
              >
                <ListItemText
                  primary={item.label}
                  sx={{ textAlign: "right" }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
};

export default Navbar;
