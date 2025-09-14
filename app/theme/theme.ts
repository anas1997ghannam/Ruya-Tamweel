//app/theme/theme.ts
import { createTheme } from "@mui/material/styles";
import { Cairo } from "next/font/google";

const cairo = Cairo({
  subsets: ["arabic"],
  weight: ["400", "700"],
  display: "swap",
});
declare module "@mui/material/styles" {
  interface Theme {
    customColors: {
      card: string;
      filter: string;
      select: string;
      accent:string;
    };
  }
  interface ThemeOptions {
    customColors?: {
      card?: string;
      filter?: string;
      select?: string;
      accent?:string;
    };
  }
}

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#ffffff", // الأبيض كعنصر تفاعلي أساسي
      light: "#eeeeee",
      dark: "#aaaaaa",
    },
    background: {
      default: "#000000", // خلفية رئيسية سوداء جداً
      paper: "#111111",   // البطاقات والخانات الداكنة
    },
    text: {
      primary: "#ffffff",
      secondary: "#888888",
    },
  },
  typography: {
    fontFamily: cairo.style.fontFamily, // <<< استخدم الخط المستورد هنا
  },
  customColors: {
    card: "#111111",
    filter: "#1a1a1a",
    select: "#222222",
    accent:"#1a2a3a"
  },
  components: {
    MuiInputLabel: {
      styleOverrides: {
        root: {
          direction: "rtl", // لجعل اللابل من اليمين لليسار
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          direction: "rtl", // لجعل الحقل نفسه من اليمين لليسار
        },
        input: {
          direction: "rtl", // لجعل النص داخل الحقل من اليمين لليسار
        },
      },
    },
  },
});

export default theme;