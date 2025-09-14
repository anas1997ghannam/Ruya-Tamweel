import {
  Box,
  Drawer,
  List,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  Dashboard,
  People,
  Work,
  Chat,
  Report,
  Notifications,
  Settings,
} from "@mui/icons-material";
import Link from "next/link";

const navItems = [
  { text: "Dashboard", icon: <Dashboard />, href: "/admin" },
  { text: "المستخدمين", icon: <People />, href: "/admin/users" },
  { text: "المشاريع", icon: <Work />, href: "/admin/projects" },
  { text: "المحادثات", icon: <Chat />, href: "/admin/conversations" },
  { text: "التبليغات", icon: <Report />, href: "/admin/reports" },
  { text: "تنبيهات", icon: <Notifications />, href: "/admin/notifications" },
  { text: "إعدادات", icon: <Settings />, href: "/admin/settings" },
];

export default function AdminSidebar() {
  return (
    <Drawer
      variant="permanent"
      anchor="right"
      sx={{
        width: 250,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 250,
          boxSizing: "border-box",
          backgroundColor: "background.paper",
          color: "text.primary",
          borderLeft: "1px solid #2c2c2c",
        },
      }}
    >
      <Box
        p={2}
        textAlign="center"
        fontWeight="bold"
        fontSize={20}
        sx={{
          backgroundColor: "primary.main",
          color: "#fff",
          boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
          borderBottom: "1px solid #333",
        }}
      >
        لوحة التحكم
      </Box>

      <List>
        {navItems.map((item) => (
          <Link href={item.href} key={item.text} passHref legacyBehavior>
            <MenuItem
              component="a"
              sx={{
                transition: "all 0.3s ease",
                "&:hover": {
                  backgroundColor: "primary.main",
                  transform: "scale(1.03)",
                  boxShadow: "0 0 12px rgba(0,188,212,0.4)",
                  borderRadius: "10px",
                  color: "#fff",
                },
              }}
            >
              <ListItemIcon sx={{ color: "inherit", minWidth: 40 }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                primaryTypographyProps={{
                  sx: {
                    fontWeight: 600,
                    fontSize: 15,
                  },
                }}
              />
            </MenuItem>
          </Link>
        ))}
      </List>
    </Drawer>
  );
}
