/**
 app/admin/projects/page.tsx
 الميزات:

جدول فيه: اسم المشروع - صاحب المشروع - عدد الداعمين - حالة المشروع.

بحث حسب صاحب المشروع.

زر لمراجعة المشروع.

زر لتعطيل المشروع.


البيانات المطلوبة:

GET /api/admin/projects?search=...

PATCH /api/admin/projects/:id/toggle
 */
"use client";
import { useEffect, useState } from "react";
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
  Select,
  MenuItem,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { toast } from "react-toastify";

interface Project {
  id: string;
  name: string;
  owner: string;
  supporters: number;
  status: "active" | "disabled" | "pending_review";
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [search, setSearch] = useState("");

  const fetchProjects = async () => {
    try {
      const res = await fetch(`/api/admin/projects?search=${search}`);
      const data = await res.json();
      setProjects(data.projects);
    } catch (err) {
      toast.error("فشل تحميل المشاريع");
    }
  };

  const handleToggleStatus = async (
    id: string,
    newStatus: Project["status"]
  ) => {
    try {
      const res = await fetch(`/api/admin/projects/${id}/toggle`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) {
        const errMsg = await res.json();
        toast.error(errMsg.message || "فشل تغيير الحالة");
        return;
      }

      toast.success("تم تحديث حالة المشروع");
      fetchProjects();
    } catch (err) {
      toast.error("فشل في الاتصال بالسيرفر");
    }
  };
  useEffect(() => {
    fetchProjects();
  }, [search]);

  return (
    <Card sx={{ m: 4, p: 2 }}>
      <CardContent>
        <div style={{ marginBottom: 20 }}>
          <TextField
            label="بحث باسم الريادي"
            placeholder="اكتب اسم صاحب المشروع..."
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
                <TableCell>اسم المشروع</TableCell>
                <TableCell>صاحب المشروع</TableCell>
                <TableCell>عدد الداعمين</TableCell>
                <TableCell>الحالة</TableCell>
                <TableCell>إجراءات</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {projects.map((project) => (
                <TableRow key={project.id}>
                  <TableCell>{project.name}</TableCell>
                  <TableCell>{project.owner}</TableCell>
                  <TableCell>{project.supporters}</TableCell>
                  <TableCell>
                    {project.status === "active"
                      ? "مفعل"
                      : project.status === "pending_review"
                      ? "بانتظار المراجعة"
                      : "معطل"}
                  </TableCell>
                  <TableCell>
                    <Select
                      value={project.status}
                      onChange={(e) =>
                        handleToggleStatus(
                          project.id,
                          e.target.value as Project["status"]
                        )
                      }
                      size="small"
                      sx={{ minWidth: 140 }}
                    >
                      <MenuItem value="active">مفعل</MenuItem>
                      <MenuItem value="disabled">معطل</MenuItem>
                      <MenuItem value="pending_review">
                        بانتظار المراجعة
                      </MenuItem>
                    </Select>
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
