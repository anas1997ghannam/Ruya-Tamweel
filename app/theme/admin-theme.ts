import { createTheme } from "@mui/material/styles";
import { Cairo } from "next/font/google";

const cairo = Cairo({
  subsets: ["arabic"],
  weight: ["400", "700"],
  display: "swap",
});

const adminTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#00bcd4",
    },
    background: {
      default: "#121212",
      paper: "#1f1f1f",
    },
    text: {
      primary: "#ffffff",
      secondary: "#aaaaaa",
    },
  },
  typography: {
    fontFamily: cairo.style.fontFamily,
  },
});

export default adminTheme;