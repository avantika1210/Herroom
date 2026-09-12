import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
  );

  const [accent, setAccent] = useState(
    localStorage.getItem("accent") || "#C58A8A"
  );

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("accent", accent);
    document.documentElement.style.setProperty(
      "--primary-color",
      accent
    );
  }, [accent]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        accent,
        setAccent,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);