import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";

export type Theme = "night" | "clear";

const STORAGE_KEY = "valenzo-theme";

interface ThemeContextValue {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggle: () => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: "night",
  setTheme: () => {},
  toggle: () => {},
});

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  if (theme === "night") root.classList.add("dark");
  else root.classList.remove("dark");
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  // Server and first client render always assume "night" (default); the inline
  // head script already set the correct class before paint, and we sync here.
  const [theme, setThemeState] = useState<Theme>("night");

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      const initial: Theme = stored === "clear" ? "clear" : "night";
      setThemeState(initial);
      applyTheme(initial);
    } catch {
      /* ignore */
    }
  }, []);

  const setTheme = useCallback((next: Theme) => {
    setThemeState(next);
    applyTheme(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
  }, []);

  const toggle = useCallback(() => {
    setTheme(theme === "night" ? "clear" : "night");
  }, [theme, setTheme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggle }}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
