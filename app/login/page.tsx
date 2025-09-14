//path->app/login/page.tsx
"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, Suspense } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  useTheme,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function LoginContent() {
  const theme = useTheme();
  const searchParams = useSearchParams();
  const role = searchParams.get("role") || "";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLoginClick = async () => {
    if (!email.trim() || !password.trim()) {
      toast.error("يرجى إدخال البريد الإلكتروني وكلمة المرور");
      return;
    }

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

      if (!response.ok) {
        toast.error(data.error || "حدث خطأ أثناء تسجيل الدخول");
        return;
      }

      if (data.status === "disabled") {
        toast.error("لقد تم حظر حسابك بسبب مخالفة قواعد وسياسات التطبيق");
        return;
      }

      if (
        data.user.role !== "admin" &&
        ((role === "investor" && data.user.role !== "investor") ||
          (role === "entrepreneur" && data.user.role !== "entrepreneur"))
      ) {
        toast.error(
          "لا يمكن تسجيل الدخول من هذه الصفحة لهذا النوع من الحسابات"
        );
        return;
      }

      toast.success("تم تسجيل الدخول بنجاح");

      setTimeout(() => {
        if (data.user.role === "admin") {
          router.push("/admin");
        } else if (data.user.role === "entrepreneur") {
          router.push("/dashboard/entrepreneur");
        } else if (data.user.role === "investor") {
          router.push("/dashboard/investor");
        }
      }, 1500);
    } catch (err) {
      console.error("حدث خطأ أثناء الاتصال بواجهة برمجة التطبيقات", err);
      toast.error("فشل الاتصال بالخادم");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        background: `linear-gradient(135deg, ${theme.palette.background.default}, ${theme.customColors.accent})`,
        color: theme.palette.text.primary,
      }}
    >
      <ToastContainer position="top-center" />
      <Paper
        elevation={10}
        sx={{
          p: 4,
          borderRadius: 4,
          width: "100%",
          maxWidth: 500,
          background: theme.customColors.card,
          color: theme.palette.text.primary,
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          align="center"
          sx={{ fontWeight: "bold", mb: 3 }}
        >
          {role === "investor"
            ? "تسجيل الدخول كمستثمر"
            : "تسجيل الدخول كرائد أعمال"}
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            label="البريد الإلكتروني"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            variant="filled"
            InputProps={{
              style: {
                backgroundColor: "#1e1e1e",
                color: theme.palette.text.primary,
              },
            }}
            InputLabelProps={{
              style: { color: theme.palette.primary.light },
            }}
          />
          <TextField
            label="كلمة المرور"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            variant="filled"
            InputProps={{
              style: {
                backgroundColor: "#1e1e1e",
                color: theme.palette.text.primary,
              },
            }}
            InputLabelProps={{
              style: { color: theme.palette.primary.light },
            }}
          />
          <Button
            variant="contained"
            onClick={handleLoginClick}
            sx={{
              mt: 2,
              background: `linear-gradient(90deg, ${theme.palette.primary.dark}, #000000)`,
              color: "white",
              fontWeight: "bold",
              "&:hover": {
                background: `linear-gradient(90deg, ${theme.palette.primary.main}, #000000)`,
              },
            }}
          >
            دخول
          </Button>
          <Typography fontSize="1rem" textAlign="center" mt={2}>
            ليس لديك حساب؟
          </Typography>
          <Button
            variant="outlined"
            fullWidth
            href={
              role === "investor"
                ? "/register?role=investor"
                : "/register?role=entrepreneur"
            }
            sx={{
              mt: 1,
              border: `2px solid ${theme.palette.primary.light}`,
              color: theme.palette.primary.light,
              fontWeight: "bold",
              background: `linear-gradient(90deg, #000000, ${theme.palette.primary.dark})`,
              "&:hover": {
                background: `linear-gradient(90deg, ${theme.palette.primary.main}, #000000)`,
                borderColor: theme.palette.primary.light,
                color: "white",
              },
            }}
          >
            أنشئ حسابك الآن
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div>جارٍ التحميل...</div>}>
      <LoginContent />
    </Suspense>
  );
}
