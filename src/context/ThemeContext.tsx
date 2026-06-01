import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const ThemeContext =
  createContext<any>(null);

export function ThemeProvider({
  children,
}: any) {

  const [theme, setTheme] =
    useState(
      localStorage.getItem("theme")
      || "light"
    );

  useEffect(() => {

  const root = document.documentElement;

  if (theme === "dark") {

    root.style.setProperty(
      "--bg",
      "#111827"
    );

    root.style.setProperty(
      "--card",
      "#1f2937"
    );

    root.style.setProperty(
      "--text",
      "#f9fafb"
    );

    root.style.setProperty(
      "--text-secondary",
      "#d1d5db"
    );

  } else {

    root.style.setProperty(
      "--bg",
      "#f9fafb"
    );

    root.style.setProperty(
      "--card",
      "#ffffff"
    );

    root.style.setProperty(
      "--text",
      "#111827"
    );

    root.style.setProperty(
      "--text-secondary",
      "#6b7280"
    );
  }

  localStorage.setItem(
    "theme",
    theme
  );

}, [theme]);

  const toggleTheme = () => {

    setTheme(
      theme === "light"
        ? "dark"
        : "light"
    );
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () =>
  useContext(ThemeContext);