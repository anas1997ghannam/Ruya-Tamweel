//path->app/register/page.tsx
"use client";

import { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  useTheme,
} from "@mui/material";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const initialFormData = {
  fullName: "",
  email: "",
  password: "",
  phone: "",
  bio: "",
};

function RegisterContent() {
  const theme = useTheme();
  const searchParams = useSearchParams();
  const router = useRouter();
  const role = searchParams.get("role") || "";
  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePhoneChange = (value: string) => {
    setFormData({ ...formData, phone: value });
  };

  const handleRegister = async () => {
    if (
      !formData.fullName.trim() ||
      !formData.email.trim() ||
      !formData.password.trim() ||
      !formData.phone.trim() ||
      !role.trim()
    ) {
      toast.error("يرجى ملء جميع الحقول المطلوبة");
      return;
    }

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, role }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "فشل في إنشاء الحساب");
        return;
      }

      toast.success("تم إنشاء الحساب بنجاح");
      setTimeout(() => {
        router.push("/login?role=" + role);
      }, 2000);
    } catch (err) {
      console.error("خطأ في الاتصال بواجهة برمجة التطبيقات", err);
      toast.error("حدث خطأ أثناء التسجيل");
    }
  };

  const textFieldStyles = {
    "& .MuiInputBase-input::placeholder": {
      color: theme.palette.primary.light,
      opacity: 1,
    },
    "& .MuiInputLabel-root": {
      color: theme.palette.primary.light,
    },
    "& .Mui-focused .MuiInputLabel-root": {
      color: theme.palette.primary.main,
    },
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        background: ` linear-gradient(135deg, ${theme.palette.background.default}, ${theme.customColors.accent})`,
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
          {role === "investor" ? "تسجيل المستثمر" : "تسجيل رائد الأعمال"}
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            label="الاسم الكامل"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            fullWidth
            variant="filled"
            placeholder="أدخل اسمك الكامل"
            InputProps={{
              style: {
                backgroundColor: "#1e1e1e",
                color: theme.palette.text.primary,
              },
            }}
            sx={textFieldStyles}
          />
          <PhoneInput
            placeholder="رقم الهاتف"
            country={"sa"}
            value={formData.phone}
            onChange={handlePhoneChange}
            inputStyle={{
              width: "100%",
              height: "56px",
              fontSize: "16px",
              backgroundColor: "#1e1e1e",
              color: "white",
              border: "none",
              borderRadius: "4px",
            }}
            buttonStyle={{
              backgroundColor: "#1e1e1e",
              border: "none",
            }}
            dropdownStyle={{
              backgroundColor: "#1e1e1e",
              color: "white",
            }}
          />
          <TextField
            label="البريد الإلكتروني"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            variant="filled"
            placeholder="أدخل بريدك الإلكتروني"
            InputProps={{
              style: {
                backgroundColor: "#1e1e1e",
                color: theme.palette.text.primary,
              },
            }}
            sx={textFieldStyles}
          />
          <TextField
            label="كلمة المرور"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            fullWidth
            variant="filled"
            placeholder="أدخل كلمة المرور"
            InputProps={{
              style: {
                backgroundColor: "#1e1e1e",
                color: theme.palette.text.primary,
              },
            }}
            sx={textFieldStyles}
          />
          {role === "entrepreneur" && (
            <TextField
              label="نبذة عن المشروع أو اهتماماتك"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              fullWidth
              multiline
              rows={3}
              variant="filled"
              placeholder="أدخل نبذة قصيرة"
              InputProps={{
                style: {
                  backgroundColor: "#1e1e1e",
                  color: theme.palette.text.primary,
                },
              }}
              sx={textFieldStyles}
            />
          )}
          <Button
            variant="contained"
            onClick={handleRegister}
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
            إنشاء الحساب
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={<div>جارٍ التحميل...</div>}>
      <RegisterContent />
    </Suspense>
  );
}
