/*
1. Dialog تعديل المقالة

مسار الملف:
app/components/dialogs/EditArticleDialog.tsx

المتطلبات:

يستقبل بيانات المقالة (العنوان والمحتوى) بشكل افتراضي.

عند الحفظ يتم إرسال طلب PUT إلى API لتحديث المقالة.

عند الإغلاق يتم إخفاء الـ Dialog بدون تعديل.
 */
// app/components/dialogs/EditArticleDialog.tsx
"use client";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Stack,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import { toast } from "react-toastify";

interface EditArticleDialogProps {
  open: boolean;
  onClose: () => void;
  article: {
    _id: string;
    title: string;
    content: string;
  };
  onUpdated: () => void;
}

const EditArticleDialog = ({
  open,
  onClose,
  article,
  onUpdated,
}: EditArticleDialogProps) => {
  const theme = useTheme();
  const [title, setTitle] = useState(article.title);
  const [content, setContent] = useState(article.content);
  const [loading, setLoading] = useState(false);

  // لتحديث الحقول عند تغيير المقال
  useEffect(() => {
    setTitle(article.title);
    setContent(article.content);
  }, [article]);

  const handleUpdate = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/articles/${article._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content }),
      });

      if (!res.ok) throw new Error("فشل في تحديث المقالة");

      toast.success("تم تحديث المقالة بنجاح");
      onUpdated();
      onClose();
    } catch (err) {
      toast.error("حدث خطأ أثناء التحديث");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ bgcolor: theme.palette.background.default }}>
        تعديل المقالة
      </DialogTitle>
      <DialogContent>
        <Stack spacing={2} mt={1}>
          <TextField
            label="عنوان المقال"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            label="محتوى المقال"
            fullWidth
            multiline
            minRows={4}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={loading}>
          إلغاء
        </Button>
        <Button variant="contained" onClick={handleUpdate} disabled={loading}>
          حفظ التعديلات
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditArticleDialog;
