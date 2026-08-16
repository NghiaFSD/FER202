import { createContext, useContext, useState } from "react";

export const themes = {
  light: {
    foreground: "#000000",
    background: "#eeeeee",
  },
  dark: {
    foreground: "#ffffff",
    background: "#61dafb",
  },
};

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [themeName, setThemeName] = useState("light");
  const toggleTheme = () => {
    setThemeName((current) => (current === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider
      value={{ theme: themes[themeName], themeName, toggleTheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used inside ThemeProvider");
  }

  return context;
}

