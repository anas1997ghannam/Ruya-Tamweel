// path: app/components/NavbarComponents/account-settings/delete-settings/DeleteSettings.tsx
"use client";

import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  CircularProgress,
  useTheme,
} from "@mui/material";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const DeleteSettings = () => {
  const [confirmation, setConfirmation] = useState("");
  const [open, setOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const router = useRouter();
  const theme = useTheme();

  const handleDelete = async () => {
    setDeleting(true);
    try {
      const res = await fetch("/api/user/delete", {
        method: "DELETE",
      });

      if (!res.ok) throw new Error();

      toast.success("تم حذف الحساب بنجاح");
      router.push("/login");
    } catch (err) {
      toast.error("فشل في حذف الحساب");
    } finally {
      setDeleting(false);
      setOpen(false);
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
      <Paper elevation={3} sx={{ p: 4, maxWidth: 500, mx: "auto", mt: 5 }}>
        <Typography variant="h6" mb={2} color="error">
          حذف الحساب
        </Typography>
        <Typography variant="body2" mb={2}>
          إذا قمت بحذف حسابك، لا يمكن التراجع عن هذا الإجراء. الرجاء كتابة كلمة
          <strong> "حذف" </strong> لتأكيد العملية.
        </Typography>
        <TextField
          label='اكتب "حذف" للتأكيد'
          fullWidth
          margin="normal"
          value={confirmation}
          onChange={(e) => setConfirmation(e.target.value)}
        />
        <Button
          variant="contained"
          color="error"
          fullWidth
          sx={{ mt: 2 }}
          onClick={() => setOpen(true)}
          disabled={confirmation !== "حذف"}
        >
          حذف الحساب نهائياً
        </Button>

        <Dialog open={open} onClose={() => setOpen(false)}>
          <DialogTitle>تأكيد الحذف</DialogTitle>
          <DialogContent>
            <DialogContentText>
              هل أنت متأكد أنك تريد حذف حسابك؟ هذا الإجراء لا يمكن التراجع عنه.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)}>إلغاء</Button>
            <Button onClick={handleDelete} color="error" autoFocus>
              {deleting ? <CircularProgress size={20} /> : "نعم، احذف الحساب"}
            </Button>
          </DialogActions>
        </Dialog>
      </Paper>
    </div>
  );
};

export default DeleteSettings;
