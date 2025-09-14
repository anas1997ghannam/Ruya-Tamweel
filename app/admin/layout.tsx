/**
 قائمة جانبية للتنقل (Dashboard, Users, Projects, ...)

AdminHeader.tsx - شريط علوي (اسم الأدمن، زر تسجيل الخروج)

AdminCard.tsx - عنصر كرت إحصائي

AdminTable.tsx - جدول عام قابل لإعادة الاستخدام
 */
// app/admin/layout.tsx
"use client";

import { ReactNode } from "react";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import AdminSidebar from "@/app/admin/components/AdminSidebar";
import AdminHeader from "@/app/admin/components/AdminHeader";
import adminTheme from "@/app/theme/admin-theme"; // رح نعمل theme خاص للـ Admin
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider theme={adminTheme}>
      <ToastContainer position="top-center" autoClose={3000} />
      <CssBaseline />
      <Box display="flex" height="100vh">
        <AdminSidebar />
        <Box flexGrow={1} display="flex" flexDirection="column">
          <AdminHeader />
          <Box component="main" p={3} flexGrow={1} sx={{ overflowY: "auto" }}>
            {children}
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
