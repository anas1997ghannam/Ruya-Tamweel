//app/components/ClientProviders.tsx
"use client";

import { ReactNode } from "react";
import { Provider } from "react-redux";
import { store } from "@/app/redux/store";
import { ToastContainer } from "react-toastify";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import {
  ThemeModeProvider,
  useThemeMode,
  getCurrentTheme,
} from "../context/ThemeContext";
import Navbar from "./Navbar";
import "react-toastify/dist/ReactToastify.css";

const ThemeWrapper = ({ children }: { children: ReactNode }) => {
  const { mode } = useThemeMode();
  const theme = getCurrentTheme(mode);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar />
      {children}
    </ThemeProvider>
  );
};

export default function ClientProviders({ children }: { children: ReactNode }) {
  return (
    <Provider store={store}>
      <ThemeModeProvider>
        <ThemeWrapper>{children}</ThemeWrapper>
      </ThemeModeProvider>
      <ToastContainer position="top-right" autoClose={3000} />
    </Provider>
  );
}
