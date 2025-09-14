/*
2. Dialog تأكيد حذف المقالة

مسار الملف:
app/components/dialogs/DeleteArticleDialog.tsx

المتطلبات:

رسالة تأكيد: "هل أنت متأكد من حذف هذه المقالة؟"

زر "نعم، احذف" ينفّذ طلب DELETE.

زر "إلغاء" يغلق الـ Dialog فقط.
 */
// app/components/dialogs/DeleteArticleDialog.tsx
"use client";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { toast } from "react-toastify";

interface DeleteArticleDialogProps {
  open: boolean;
  onClose: () => void;
  articleId: string;
  onDeleted: () => void;
}

const DeleteArticleDialog = ({
  open,
  onClose,
  articleId,
  onDeleted,
}: DeleteArticleDialogProps) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/articles/${articleId}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("فشل في حذف المقالة");

      toast.success("تم حذف المقالة بنجاح");
      onDeleted();
      onClose();
    } catch (err) {
      toast.error("حدث خطأ أثناء حذف المقالة");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>تأكيد الحذف</DialogTitle>
      <DialogContent>
        <Typography>
          هل أنت متأكد أنك تريد حذف هذه المقالة؟ لا يمكن التراجع بعد الحذف.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={loading}>
          إلغاء
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={handleDelete}
          disabled={loading}
        >
          حذف
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteArticleDialog;
