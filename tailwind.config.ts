import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}", "./lib/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        surface: "var(--surface)",
        text: "var(--text)",
        muted: "var(--muted)",
        accent: "var(--accent)",
        border: "var(--border)"
      },
      fontFamily: {
        heading: "var(--font-heading)",
        body: "var(--font-body)"
      },
      boxShadow: {
        soft: "0 10px 30px -20px rgba(8, 36, 40, 0.35)"
      }
    }
  },
  plugins: []
};

export default config;
