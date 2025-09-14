// path: app/components/NavbarComponents/account-settings/logout-settings/LogoutSettings.tsx
"use client";

import { useRouter } from "next/navigation";
import { Button, Paper, Typography, useTheme } from "@mui/material";
import { toast } from "react-toastify";
import { clearUser } from "@/app/redux/slices/userSlice";
import { useDispatch, UseDispatch } from "react-redux";

const LogoutSettings = () => {
  const router = useRouter();
  const theme = useTheme();
  const dispatch = useDispatch();
  const handleLogout = async () => {
    try {
      const res = await fetch("/api/auth/logout", {
        method: "POST",
      });
      if (!res.ok) {
        toast.error("فشل تسجيل الخروج");
        return;
      }
      dispatch(clearUser());

      toast.success("تم تسجيل الخروج بنجاح");
      router.push("/components/home");
    } catch (error) {
      toast.error("حدث خطأ أثناء تسجيل الخروج");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: theme.palette.background.default,
        height: "100vh",
        width: "100%",
        padding: "10px",
      }}
    >
      <Paper elevation={3} sx={{ p: 4, mx: "auto", maxWidth: "500px" }}>
        <Typography variant="h5" mb={2} color="error">
          تسجيل الخروج
        </Typography>
        <Typography variant="h6" mb={2} mr={1}>
          تأكد من حفظ أي تغيرات قبل المتابعة.
        </Typography>
        <Typography variant="h6" mb={2} mr={1}>
          سيتم انهاء جلستك الحالية.
        </Typography>
        <Typography variant="h6" mb={2} mr={1}>
          يمكنك تسجيل الدخول مرة أخرى في أي وقت.
        </Typography>
        <Typography variant="h6" mb={2} mr={1}>
          نأمل أن نراك قريبا.
        </Typography>
        <Button
          variant="contained"
          color="error"
          fullWidth
          onClick={handleLogout}
        >
          تسجيل الخروج
        </Button>
      </Paper>
    </div>
  );
};

export default LogoutSettings;
