import { useTheme } from "../contexts/ThemeContext.jsx";

export default function Theme() {
  const { theme, themeName, toggleTheme } = useTheme();

  return (
    <section className="theme-section">
      <div className="section-title">
        <span>01</span>
        <div>
          <h2>Theme Context</h2>
          <p>Consume a shared theme and toggle it without passing props.</p>
        </div>
      </div>
      <div
        className="theme-demo"
        style={{ color: theme.foreground, backgroundColor: theme.background }}
      >
        <div>
          <p>Current theme</p>
          <strong>{themeName}</strong>
        </div>
        <button
          onClick={toggleTheme}
          style={{
            color: theme.background,
            backgroundColor: theme.foreground,
          }}
        >
          Change to {themeName === "light" ? "dark" : "light"} theme
        </button>
      </div>
    </section>
  );
}

