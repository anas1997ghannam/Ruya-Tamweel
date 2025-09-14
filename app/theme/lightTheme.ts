import { createTheme } from "@mui/material/styles";
import { Cairo } from "next/font/google";

const cairo = Cairo({
  subsets: ["arabic"],
  weight: ["400", "700"],
  display: "swap",
});

const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1976d2",
      light: "#63a4ff",
      dark: "#004ba0",
    },
    background: {
      default: "#f9f9f9",
      paper: "#ffffff",
    },
    text: {
      primary: "#1a1a1a",
      secondary: "#666666",
    },
  },
  typography: {
    fontFamily: cairo.style.fontFamily,
  },
  customColors: {
    card: "#ffffff",
    filter: "#f0f0f0",
    select: "#e4e4e4",
    accent: "#1976d2",
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          color: "#1a1a1a", // <<< صرّحنا لون النص مباشرة
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          direction: "rtl",
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          direction: "rtl",
        },
        input: {
          direction: "rtl",
        },
      },
    },
  },
});

export default lightTheme;