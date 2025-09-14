/*
app/admin/notifications
الميزات:

اختيار الكل، الرياديين فقط، المستثمرين فقط.

كتابة محتوى الرسالة.

زر "إرسال".

البريد باستخدام nodemailer.


API:

POST /api/admin/notify with { message, role? }
 */
"use client";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  MenuItem,
  Button,
  Box,
} from "@mui/material";
import { useState } from "react";

export default function NotificationsPage() {
  const [role, setRole] = useState("all");
  const [message, setMessage] = useState("");

  const handleSend = async () => {
    try {
      const res = await fetch("/api/admin/notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message,
          role: role === "all" ? undefined : role,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        alert("تم إرسال الرسالة بنجاح");
        setMessage("");
      } else {
        alert("حدث خطأ أثناء الإرسال: " + data.error);
      }
    } catch (err) {
      alert("فشل الاتصال بالخادم.");
    }
  };

  return (
    <Card sx={{ m: 4, p: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          إرسال إشعار جماعي
        </Typography>

        <Box display="flex" flexDirection="column" gap={2} mt={2}>
          <TextField
            select
            label="اختر الفئة المستهدفة"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            fullWidth
          >
            <MenuItem value="all">الجميع</MenuItem>
            <MenuItem value="entrepreneur">الرياديين فقط</MenuItem>
            <MenuItem value="investor">المستثمرين فقط</MenuItem>
          </TextField>

          <TextField
            label="محتوى الرسالة"
            multiline
            rows={6}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            fullWidth
          />

          <Button
            variant="contained"
            color="primary"
            onClick={handleSend}
            disabled={!message.trim()}
          >
            إرسال
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
