import { AppBar, Box, Toolbar, Typography, IconButton } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";

export default function AdminHeader() {
  const handleLogout = () => {
    // نفذ تسجيل الخروج
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#222" }} elevation={1}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography variant="h6" component="div">
          أهلاً بك، أدمن
        </Typography>
        <IconButton color="inherit" onClick={handleLogout}>
          <LogoutIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
