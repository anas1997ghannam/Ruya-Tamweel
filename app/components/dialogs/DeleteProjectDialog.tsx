"use client";
import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";

interface Props {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function DeleteProjectDialog({
  open,
  onClose,
  onConfirm,
}: Props) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>تأكيد الحذف</DialogTitle>
      <DialogContent>
        هل أنت متأكد أنك تريد حذف هذا المشروع؟ لا يمكن التراجع بعد الحذف.
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>إلغاء</Button>
        <Button onClick={onConfirm} color="error" variant="contained">
          حذف
        </Button>
      </DialogActions>
    </Dialog>
  );
}
