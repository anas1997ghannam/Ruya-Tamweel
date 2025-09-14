//app/components/dialogs/ArticleDialog.tsx
"use client";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

interface ArticleDialogProps {
  open: boolean;
  onClose: () => void;
}

const ArticleDialog = ({ open, onClose }: ArticleDialogProps) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const theme = useTheme();

  const handleSubmit = async () => {
    if (!title.trim() || !content.trim()) {
      toast.warning("يرجى تعبئة جميع الحقول");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/articles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content }),
      });

      if (!res.ok) throw new Error("فشل في إنشاء المقالة");

      toast.success("تمت إضافة المقالة بنجاح");
      onClose();
      setTitle("");
      setContent("");
      router.refresh();
    } catch (error) {
      toast.error("حدث خطأ أثناء إضافة المقالة");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle
        sx={{ fontWeight: "bold", color: "primary.main", textAlign: "center" }}
      >
        إضافة مدونة جديدة
      </DialogTitle>

      <DialogContent dividers sx={{ bgcolor: "background.paper" }}>
        <TextField
          label="عنوان المقال"
          fullWidth
          variant="outlined"
          sx={{ my: 2 }}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          label="محتوى المقال"
          fullWidth
          multiline
          rows={6}
          variant="outlined"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </DialogContent>

      <DialogActions sx={{ justifyContent: "space-between", px: 3, pb: 2 }}>
        <Button variant="outlined" color="secondary" onClick={onClose}>
          إلغاء
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "جارٍ الحفظ..." : "إضافة"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ArticleDialog;
