// path: app/components/NavbarComponents/account-settings/general-settings/GeneralSettings.tsx
"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  CircularProgress,
  useTheme,
} from "@mui/material";
import { toast } from "react-toastify";

const GeneralSettings = () => {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const theme = useTheme();
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/user/me");
        const data = await res.json();
        setFullName(data.user?.fullName || "");
        setPhone(data.user?.phone || "");
      } catch (err) {
        toast.error("فشل في تحميل بيانات المستخدم");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleUpdate = async () => {
    setUpdating(true);
    try {
      const res = await fetch("/api/user/update", {
        //تعديل api
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fullName, phone }),
      });

      if (!res.ok) throw new Error();

      toast.success("تم تحديث المعلومات بنجاح");
    } catch (err) {
      toast.error("حدث خطأ أثناء التحديث");
    } finally {
      setUpdating(false);
    }
  };

  if (loading)
    return (
      <Box textAlign="center" mt={5}>
        <CircularProgress />
      </Box>
    );

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: theme.palette.background.default,
        height: "100vh",
        padding: "10px",
      }}
    >
      <Paper
        elevation={3}
        sx={{ p: 4, maxWidth: 500, mx: "auto", mt: 5, alignItems: "center" }}
      >
        <Typography variant="h6" mb={2}>
          إعدادات الحساب العامة
        </Typography>
        <TextField
          label="الاسم الكامل"
          fullWidth
          margin="normal"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
        <TextField
          label="رقم الهاتف"
          fullWidth
          margin="normal"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
          onClick={handleUpdate}
          disabled={updating}
        >
          {updating ? "جاري الحفظ..." : "حفظ التغييرات"}
        </Button>
      </Paper>
    </div>
  );
};

export default GeneralSettings;
