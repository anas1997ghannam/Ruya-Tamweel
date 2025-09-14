//path:app/admin/users/page.tsx
//todo :ادارة المستخدمين
/*
الميزات:

جدول فيه: الاسم - البريد - الدور - تاريخ التسجيل - الحالة (مفعل/معطل) - أزرار (تعطيل/تفعيل - حذف).

خانة بحث.

فلترة حسب الدور.

البيانات المطلوبة:

GET /api/admin/users?search=abc&role=entrepreneur

PATCH /api/admin/users/:id/toggle

DELETE /api/admin/users/:id
 */

"use client";
import {
  Box,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Pagination,
  TextField,
  MenuItem,
} from "@mui/material";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface User {
  id: string;
  fullName: string;
  email: string;
  role: string;
  status: "active" | "disabled";
  createdAt: string;
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("");

  const fetchUsers = async () => {
    try {
      const params = new URLSearchParams();
      if (search) params.append("search", search);
      if (role) params.append("role", role);
      params.append("page", String(page));

      const res = await fetch(`/api/admin/users?${params.toString()}`);
      const data = await res.json();
      setUsers(data.users);
      setTotalPages(data.totalPages);
    } catch (error) {
      toast.error("فشل تحميل المستخدمين");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page, search, role]);

  const handleToggleStatus = async (
    id: string,
    currentStatus: "active" | "disabled"
  ) => {
    try {
      const newStatus = currentStatus === "active" ? "disabled" : "active";
      await fetch(`/api/admin/users/${id}/status`, {
        method: "PATCH",
        body: JSON.stringify({ status: newStatus }),
        headers: { "Content-Type": "application/json" },
      });
      toast.success(`تم ${newStatus === "active" ? "تفعيل" : "تعطيل"} الحساب`);
      fetchUsers();
    } catch (err) {
      toast.error("حدث خطأ أثناء تغيير الحالة");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await fetch(`/api/admin/users/${id}`, { method: "DELETE" });
      toast.success("تم حذف المستخدم");
      fetchUsers();
    } catch (err) {
      toast.error("حدث خطأ أثناء حذف المستخدم");
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handleRoleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRole(e.target.value);
    setPage(1);
  };

  return (
    <Box p={4}>
      <Card>
        <CardContent>
          <Box display="flex" gap={2} mb={2}>
            <TextField
              label="بحث بالاسم أو البريد"
              value={search}
              onChange={handleSearchChange}
              fullWidth
            />
            <TextField
              label="تصفية بالدور"
              select
              value={role}
              onChange={handleRoleChange}
              sx={{ width: 200 }}
            >
              <MenuItem value="">الكل</MenuItem>
              <MenuItem value="entrepreneur">ريادي</MenuItem>
              <MenuItem value="investor">مستثمر</MenuItem>
            </TextField>
          </Box>

          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>الاسم</TableCell>
                  <TableCell>البريد</TableCell>
                  <TableCell>الدور</TableCell>
                  <TableCell>تاريخ التسجيل</TableCell>
                  <TableCell>الحالة</TableCell>
                  <TableCell>إجراءات</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.fullName}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>{user.createdAt}</TableCell>
                    <TableCell>
                      {user.status === "active" ? "مفعل" : "معطل"}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        size="small"
                        color={user.status === "active" ? "warning" : "success"}
                        onClick={() => handleToggleStatus(user.id, user.status)}
                      >
                        {user.status === "active" ? "تعطيل" : "تفعيل"}
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        size="small"
                        sx={{ ml: 1 }}
                        onClick={() => handleDelete(user.id)}
                      >
                        حذف
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Box display="flex" justifyContent="center" mt={3}>
            <Pagination
              count={totalPages}
              page={page}
              onChange={(_, val) => setPage(val)}
              color="primary"
            />
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
