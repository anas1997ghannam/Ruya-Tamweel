/*
 app/admin/page.tsx 
 الميزات:

عدد المستخدمين الكلي.

عدد الرياديين.

عدد المستثمرين.

عدد المشاريع المدعومة.

رسم بياني شهري بعدد المستخدمين الجدد.


البيانات المطلوبة:

API:

GET /api/admin/stats/users → يرجع { total, entrepreneurs, investors }

GET /api/admin/stats/projects → يرجع { totalSupported }

GET /api/admin/stats/users-by-month → يرجع بيانات شهرية للرسم البياني.
 */

"use client";

import { Box, Grid, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import UserStatsCard from "./components/UserStatsCard";
import UserChart from "./components/UserChart";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    entrepreneurs: 0,
    investors: 0,
    supportedProjects: 0,
  });

  useEffect(() => {
    // هنا بترجع الداتا من API لاحقاً، حالياً داتا وهمية
    setStats({
      totalUsers: 230,
      entrepreneurs: 120,
      investors: 90,
      supportedProjects: 45,
    });
  }, []);

  return (
    <Box>
      <Typography variant="h5" mb={3}>
        لوحة التحكم - نظرة عامة
      </Typography>

      <Grid container spacing={2}>
        <UserStatsCard label="عدد المستخدمين الكلي" value={stats.totalUsers} />
        <UserStatsCard label="عدد الرياديين" value={stats.entrepreneurs} />
        <UserStatsCard label="عدد المستثمرين" value={stats.investors} />
        <UserStatsCard
          label="عدد المشاريع المدعومة"
          value={stats.supportedProjects}
        />
      </Grid>

      <Box mt={5}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" mb={2}>
            عدد المستخدمين الجدد حسب الشهر
          </Typography>
          <UserChart />
        </Paper>
      </Box>
    </Box>
  );
}
