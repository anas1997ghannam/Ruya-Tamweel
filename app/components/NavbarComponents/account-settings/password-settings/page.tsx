// path: app/components/NavbarComponents/account-settings/password-settings/PasswordSettings.tsx
"use client";

import React, { useState } from "react";
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

const PasswordSettings = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [updating, setUpdating] = useState(false);
  const theme = useTheme();

  const handlePasswordUpdate = async () => {
    if (newPassword !== confirmPassword) {
      toast.error("كلمة المرور الجديدة وتأكيدها غير متطابقين");
      return;
    }

    setUpdating(true);
    try {
      const res = await fetch("/api/user/change-password", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      if (!res.ok) throw new Error();

      toast.success("تم تغيير كلمة المرور بنجاح");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      toast.error("فشل في تغيير كلمة المرور");
    } finally {
      setUpdating(false);
    }
  };

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
        sx={{ p: 4, maxWidth: 500, mx: "auto", mt: 5, ml: 1, mr: 1 }}
      >
        <Typography variant="h6" mb={2}>
          تغيير كلمة المرور
        </Typography>
        <TextField
          label="كلمة المرور الحالية"
          type="password"
          fullWidth
          margin="normal"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
        />
        <TextField
          label="كلمة المرور الجديدة"
          type="password"
          fullWidth
          margin="normal"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <TextField
          label="تأكيد كلمة المرور الجديدة"
          type="password"
          fullWidth
          margin="normal"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
          onClick={handlePasswordUpdate}
          disabled={updating}
        >
          {updating ? "جاري التحديث..." : "تحديث كلمة المرور"}
        </Button>
      </Paper>
    </div>
  );
};

export default PasswordSettings;
