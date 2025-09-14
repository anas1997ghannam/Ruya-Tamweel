"use client";

import { Button, Typography, Box } from "@mui/material";
import { useThemeMode } from "@/app/context/ThemeContext";

export default function ThemeSettingsPage() {
  const { mode, toggleTheme } = useThemeMode();

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h5" gutterBottom>
        إعدادات المظهر
      </Typography>
      <Typography mb={2}>
        الوضع الحالي: {mode === "dark" ? "داكن" : "فاتح"}
      </Typography>
      <Button variant="contained" onClick={toggleTheme}>
        تبديل إلى {mode === "dark" ? "فاتح" : "داكن"}
      </Button>
    </Box>
  );
}
