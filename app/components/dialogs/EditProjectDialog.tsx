"use client";
import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Button,
} from "@mui/material";

interface Props {
  open: boolean;
  project: any;
  onClose: () => void;
  onSave: () => void;
  setProject: (project: any) => void;
}

export default function EditProjectDialog({
  open,
  project,
  onClose,
  onSave,
  setProject,
}: Props) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>تعديل المشروع</DialogTitle>
      <DialogContent
        sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}
      >
        <TextField
          label="اسم المشروع"
          value={project?.name || ""}
          onChange={(e) => setProject({ ...project, name: e.target.value })}
        />
        <TextField
          select
          label="نوع المشروع"
          value={project?.type || ""}
          onChange={(e) => setProject({ ...project, type: e.target.value })}
        >
          <MenuItem value="تجاري">تجاري</MenuItem>
          <MenuItem value="صناعي">صناعي</MenuItem>
          <MenuItem value="تقني">تقني</MenuItem>
          <MenuItem value="زراعي">زراعي</MenuItem>
        </TextField>
        <TextField
          label="وصف المشروع"
          value={project?.description || ""}
          onChange={(e) =>
            setProject({ ...project, description: e.target.value })
          }
        />
        <TextField
          label="الميزانية"
          type="number"
          value={project?.budget || ""}
          onChange={(e) => setProject({ ...project, budget: +e.target.value })}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>إلغاء</Button>
        <Button onClick={onSave} variant="contained" color="primary">
          حفظ التغييرات
        </Button>
      </DialogActions>
    </Dialog>
  );
}
