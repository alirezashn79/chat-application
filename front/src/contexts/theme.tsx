import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type Theme = "dark" | "light" | "system";

interface ThemeContextState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

interface ThemeContextProviderProps {
  children: ReactNode;
  defaultTheme?: Theme;
  storageKey: string;
}

const ThemeContext = createContext<ThemeContextState | undefined>(undefined);

export function useThemeContext() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("ThemeContext not found");
  return context;
}

export function ThemeContextProvider({
  children,
  defaultTheme = "system",
  storageKey = "vite-ui-theme",
  ...props
}: ThemeContextProviderProps) {
  /* ---------- hook ---------- */
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme,
  );

  /* ---------- constant ---------- */
  const value = {
    theme,
    setTheme: (theme: Theme) => {
      localStorage.setItem(storageKey, theme);
      setTheme(theme);
    },
  };

  /* ---------- life cycle ---------- */
  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove("light", "dark");

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";

      root.classList.add(systemTheme);
      return;
    }

    root.classList.add(theme);
  }, [theme]);

  return (
    <ThemeContext.Provider {...props} value={value}>
      {children}
    </ThemeContext.Provider>
  );
}
