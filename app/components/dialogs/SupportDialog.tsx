//path-->app/components/dialogs/supportDialog.tsx
"use client";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Stack,
} from "@mui/material";
import { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

interface SupportDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: {
    title: string;
    date: string;
    time: string;
    phone: string;
  }) => void;
}

export default function SupportDialog({
  open,
  onClose,
  onSubmit,
}: SupportDialogProps) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = () => {
    onSubmit({ title, date, time, phone });
    // reset
    setTitle("");
    setDate("");
    setTime("");
    setPhone("");
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>تحديد تفاصيل اللقاء</DialogTitle>
      <DialogContent>
        <Stack spacing={2} mt={1}>
          <TextField
            label="عنوان اللقاء"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            label="تاريخ اللقاء"
            type="date"
            InputLabelProps={{ shrink: true }}
            fullWidth
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <TextField
            label="توقيت اللقاء"
            type="time"
            InputLabelProps={{ shrink: true }}
            fullWidth
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
          <PhoneInput
            country={"sa"}
            value={phone}
            onChange={(value) => setPhone(value)}
            inputStyle={{
              width: "100%",
              height: "56px",
              fontSize: "16px",
            }}
            placeholder="رقم الهاتف"
            enableSearch
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          إلغاء
        </Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          إرسال
        </Button>
      </DialogActions>
    </Dialog>
  );
}
