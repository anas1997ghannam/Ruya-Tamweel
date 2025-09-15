//path->app/register/page.tsx
"use client";

import { Suspense, useState } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  LinearProgress,
} from "@mui/material";
import PhoneInput from "react-phone-input-2";
import { ToastContainer, toast } from "react-toastify";
import "react-phone-input-2/lib/style.css";
import "react-toastify/dist/ReactToastify.css";
import zxcvbn from "zxcvbn";
import { useTheme } from "@mui/material/styles";

function RegisterContent() {
  const theme = useTheme();

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    password: "",
    bio: "",
  });

  const [passwordStrength, setPasswordStrength] = useState(0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "password") {
      const result = zxcvbn(value);
      setPasswordStrength(result.score); // 0 → 4
    }
  };

  const handlePhoneChange = (value: string) => {
    setFormData((prev) => ({ ...prev, phone: value }));
  };

  const handleRegister = () => {
    if (passwordStrength < 3) {
      toast.error("كلمة المرور ضعيفة جدًا. الرجاء اختيار كلمة مرور أقوى.");
      return;
    }

    // تابع عملية التسجيل
    toast.success("تم إنشاء الحساب بنجاح 🎉");
  };

  const getStrengthColor = (score: number) => {
    switch (score) {
      case 0:
        return "error";
      case 1:
        return "warning";
      case 2:
        return "warning";
      case 3:
        return "success";
      case 4:
        return "success";
      default:
        return "error";
    }
  };

  const getStrengthLabel = (score: number) => {
    switch (score) {
      case 0:
        return "ضعيفة جدًا";
      case 1:
        return "ضعيفة";
      case 2:
        return "متوسطة";
      case 3:
        return "قوية";
      case 4:
        return "قوية جدًا";
      default:
        return "غير معروفة";
    }
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
          تسجيل مستخدم جديد
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
          />

          {/* مؤشر قوة كلمة المرور */}
          {formData.password && (
            <Box>
              <LinearProgress
                variant="determinate"
                value={(passwordStrength + 1) * 20}
                color={getStrengthColor(passwordStrength) as any}
                sx={{ height: 8, borderRadius: 2, mb: 1 }}
              />
              <Typography variant="body2" sx={{ textAlign: "center" }}>
                قوة كلمة المرور: {getStrengthLabel(passwordStrength)}
              </Typography>
            </Box>
          )}

          <TextField
            label="نبذة"
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            fullWidth
            multiline
            rows={3}
            variant="filled"
            placeholder="أدخل نبذة قصيرة"
          />

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
