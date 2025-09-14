/*
app/admin/reports/page.tsx

5. إدارة التبليغات (UI فقط الآن) - /admin/reports/page.tsx

الميزات:

قائمة التبليغات.

نوع التبليغ (مشروع مخالف - حساب مزيف...).

زر "معالجة التبليغ" (حذف مشروع - إغلاق حساب).
 */
"use client";
import {
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Button,
  Paper,
  Chip,
} from "@mui/material";

const mockReports = [
  {
    id: 1,
    reporter: "ليلى الريادية",
    target: "مشروع الطاقة الشمسية",
    type: "مشروع مخالف",
    date: "2025-05-19",
  },
  {
    id: 2,
    reporter: "سامر المستثمر",
    target: "أدهم المزيف",
    type: "حساب مزيف",
    date: "2025-05-17",
  },
  {
    id: 3,
    reporter: "نور الريادي",
    target: "مشروع الدعم الكاذب",
    type: "مشروع مخالف",
    date: "2025-05-15",
  },
];

export default function ReportsPage() {
  return (
    <Card sx={{ m: 4, p: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          إدارة التبليغات
        </Typography>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>المبلِّغ</TableCell>
                <TableCell>المُبلَّغ عليه</TableCell>
                <TableCell>نوع التبليغ</TableCell>
                <TableCell>تاريخ</TableCell>
                <TableCell>إجراءات</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mockReports.map((report) => (
                <TableRow key={report.id}>
                  <TableCell>{report.reporter}</TableCell>
                  <TableCell>{report.target}</TableCell>
                  <TableCell>
                    <Chip
                      label={report.type}
                      color={
                        report.type === "مشروع مخالف" ? "error" : "warning"
                      }
                      size="small"
                    />
                  </TableCell>
                  <TableCell>{report.date}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      size="small"
                      color="error"
                      sx={{ mr: 1 }}
                    >
                      حذف مشروع
                    </Button>
                    <Button variant="outlined" size="small" color="warning">
                      إغلاق الحساب
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
