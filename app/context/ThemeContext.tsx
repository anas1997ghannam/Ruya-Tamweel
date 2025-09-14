"use client";

import { createContext, useContext, useEffect, useState } from "react";
import darkTheme from "../theme/theme";
import lightTheme from "../theme/lightTheme";

const themes = {
  dark: darkTheme,
  light: lightTheme,
};

type ThemeMode = keyof typeof themes;

interface ThemeContextType {
  mode: ThemeMode;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

export const useThemeMode = () => {
  const context = useContext(ThemeContext);
  if (!context)
    throw new Error("useThemeMode must be used within ThemeProvider");
  return context;
};

export const ThemeModeProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [mode, setMode] = useState<ThemeMode>("dark");

  useEffect(() => {
    const saved = localStorage.getItem("themeMode") as ThemeMode;
    if (saved && themes[saved]) setMode(saved);
  }, []);

  const toggleTheme = () => {
    const newMode = mode === "dark" ? "light" : "dark";
    setMode(newMode);
    localStorage.setItem("themeMode", newMode);
  };

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const getCurrentTheme = (mode: ThemeMode) => themes[mode];
