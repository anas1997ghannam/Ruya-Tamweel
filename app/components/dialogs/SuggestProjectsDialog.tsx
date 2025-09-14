//app/components/dialogs/SuggestProjectDialog.tsx
"use client";

import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  Typography,
  CircularProgress,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";

interface SuggestedProject {
  name: string;
  type: string;
  description: string;
  budget: number;
}

interface Props {
  open: boolean;
  onClose: () => void;
  onSelect: (project: SuggestedProject) => void;
}

const SuggestProjectsDialog = ({ open, onClose, onSelect }: Props) => {
  const [selectedType, setSelectedType] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<SuggestedProject[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchSuggestions = async () => {
    if (!selectedType) return;
    setLoading(true);
    setSuggestions([]);
    setError(null);
    try {
      const res = await fetch("/api/suggest-projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: selectedType }),
      });
      const data = await res.json();
      if (data.success) {
        setSuggestions(data.projects);
      } else {
        setError("فشل في جلب المشاريع");
      }
    } catch (err) {
      setError("حدث خطأ أثناء الاتصال بالخادم");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setSuggestions([]);
    setError(null);
  }, [open]);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md" dir="rtl">
      <DialogTitle>اقتراح مشروع من الذكاء الاصطناعي</DialogTitle>
      <DialogContent dividers>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel id="type-label">اختر نوع المشروع</InputLabel>
          <Select
            labelId="type-label"
            value={selectedType}
            label="اختر نوع المشروع"
            onChange={(e) => setSelectedType(e.target.value)}
          >
            <MenuItem value="تجاري">تجاري</MenuItem>
            <MenuItem value="زراعي">زراعي</MenuItem>
            <MenuItem value="صناعي">صناعي</MenuItem>
            <MenuItem value="تقني">تقني</MenuItem>
          </Select>
        </FormControl>

        <Button
          variant="contained"
          color="primary"
          disabled={!selectedType || loading}
          onClick={fetchSuggestions}
        >
          جلب الاقتراحات
        </Button>

        {loading && (
          <div style={{ marginTop: 16 }}>
            <CircularProgress />
          </div>
        )}

        {error && (
          <Typography color="error" style={{ marginTop: 16 }}>
            {error}
          </Typography>
        )}

        {!loading && suggestions.length > 0 && (
          <Grid container spacing={2} style={{ marginTop: 16 }}>
            {suggestions.map((project, index) => (
              <Grid sx={{ xs: 12, md: 6 }} key={index}>
                <div
                  style={{
                    background: "#1e1e1e",
                    padding: 16,
                    borderRadius: 8,
                    color: "white",
                  }}
                >
                  <Typography variant="h6">{project.name}</Typography>
                  <Typography variant="body2" color="lightblue">
                    {project.type}
                  </Typography>
                  <Typography variant="body2" style={{ marginTop: 8 }}>
                    {project.description}
                  </Typography>
                  <Typography variant="body2" style={{ marginTop: 4 }}>
                    الميزانية: {project.budget} $
                  </Typography>
                  <Button
                    variant="contained"
                    color="secondary"
                    style={{ marginTop: 10 }}
                    onClick={() => onSelect(project)}
                  >
                    اختر هذا المشروع
                  </Button>
                </div>
              </Grid>
            ))}
          </Grid>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>إغلاق</Button>
      </DialogActions>
    </Dialog>
  );
};

export default SuggestProjectsDialog;
