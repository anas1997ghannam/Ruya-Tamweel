/*
app/admin/settings/page.tsx

واجهة:

تغيير الشعار.

إدارة رسائل البريد التلقائية.

صلاحيات التحكم (تُعرض كخيارات فقط حالياً).

 */
"use client";
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  FormControlLabel,
  Checkbox,
  Box,
} from "@mui/material";
import { useState } from "react";

type PermissionKey =
  | "canEditProjects"
  | "canDeleteUsers"
  | "canSendNotifications";

const permissionLabels: Record<PermissionKey, string> = {
  canEditProjects: "التحكم بالمشاريع",
  canDeleteUsers: "حذف المستخدمين",
  canSendNotifications: "إرسال التنبيهات",
};

export default function SettingsPage() {
  const [permissions, setPermissions] = useState<
    Record<PermissionKey, boolean>
  >({
    canEditProjects: true,
    canDeleteUsers: false,
    canSendNotifications: true,
  });

  const handlePermissionChange = (key: PermissionKey) => {
    setPermissions((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <Box sx={{ p: 4 }}>
      <Card sx={{ maxWidth: 600, mx: "auto" }}>
        <CardHeader
          title={
            <Typography variant="h6" component="div">
              صلاحيات التحكم
            </Typography>
          }
        />
        <CardContent>
          {Object.keys(permissionLabels).map((key) => (
            <FormControlLabel
              key={key}
              control={
                <Checkbox
                  checked={permissions[key as PermissionKey]}
                  onChange={() => handlePermissionChange(key as PermissionKey)}
                />
              }
              label={permissionLabels[key as PermissionKey]}
              sx={{ display: "block", mb: 2 }}
            />
          ))}
        </CardContent>
      </Card>
    </Box>
  );
}
