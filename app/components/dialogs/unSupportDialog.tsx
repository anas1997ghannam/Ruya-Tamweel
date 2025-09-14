//path:app/components/dialogs/unSupportDialog.tsx
"use client";
import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";

interface UnsupportDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  projectName: string | null;
}

const UnsupportDialog: React.FC<UnsupportDialogProps> = ({
  open,
  onClose,
  onConfirm,
  projectName,
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>تأكيد إلغاء الدعم</DialogTitle>
      <DialogContent>
        <Typography>
          هل أنت متأكد من أنك تريد إلغاء الدعم عن مشروع{" "}
          <strong>{projectName}</strong>؟
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>إلغاء</Button>
        <Button onClick={onConfirm} color="error" variant="contained">
          تأكيد الإلغاء
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UnsupportDialog;
