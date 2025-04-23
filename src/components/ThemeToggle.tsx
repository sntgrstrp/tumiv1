
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

const getInitialTheme = (): "dark" | "light" => {
  if (typeof window !== "undefined" && window.localStorage) {
    const stored = localStorage.getItem("theme");
    if (stored === "dark" || stored === "light") return stored;
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) return "dark";
  }
  return "light";
};

const ThemeToggle = () => {
  const [theme, setTheme] = useState<"dark" | "light">(getInitialTheme());

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <button
      aria-label={`Cambiar a modo ${theme === "dark" ? "claro" : "oscuro"}`}
      className="ml-2 rounded-full p-2 border border-border shadow bg-background/70 hover:bg-muted/60 transition"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      type="button"
    >
      {theme === "dark" ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-ubike" />}
    </button>
  );
};

export default ThemeToggle;
