/**
 4. إدارة المحادثات (UI فقط الآن) - /admin/conversations/page.tsx

الميزات (واجهة فقط):

عرض المحادثات.

بحث أو تصفح حسب المستخدم.

زر حذف أو كتم (فقط واجهة).

نظام Flog System (واجهة فقط).
 */
"use client";
import { useState } from "react";
import {
  Card,
  CardContent,
  TextField,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Chip,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const mockConversations = [
  {
    id: 1,
    user: "ليلى الريادية",
    lastMessage: "أحتاج مزيد من المعلومات...",
    flog: "تم الإبلاغ",
    date: "2025-05-20",
  },
  {
    id: 2,
    user: "سعيد المستثمر",
    lastMessage: "ممتاز، متى نبدأ؟",
    flog: "",
    date: "2025-05-18",
  },
  {
    id: 3,
    user: "نور الريادي",
    lastMessage: "هل العرض لا يزال متاحًا؟",
    flog: "سلوك مزعج",
    date: "2025-05-15",
  },
];

export default function ConversationsPage() {
  const [search, setSearch] = useState("");

  const filtered = mockConversations.filter((conv) =>
    conv.user.includes(search)
  );

  return (
    <Card sx={{ m: 4, p: 2 }}>
      <CardContent>
        <div style={{ marginBottom: 20 }}>
          <TextField
            label="بحث باسم المستخدم"
            placeholder="ابحث عن مستخدم..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            sx={{ minWidth: 300 }}
          />
        </div>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>المستخدم</TableCell>
                <TableCell>آخر رسالة</TableCell>
                <TableCell>التاريخ</TableCell>
                <TableCell>Flog</TableCell>
                <TableCell>إجراءات</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filtered.map((conv) => (
                <TableRow key={conv.id}>
                  <TableCell>{conv.user}</TableCell>
                  <TableCell>{conv.lastMessage}</TableCell>
                  <TableCell>{conv.date}</TableCell>
                  <TableCell>
                    {conv.flog ? (
                      <Chip label={conv.flog} color="error" size="small" />
                    ) : (
                      "-"
                    )}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="error"
                      size="small"
                      sx={{ mr: 1 }}
                    >
                      حذف
                    </Button>
                    <Button variant="outlined" color="warning" size="small">
                      كتم
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
}
