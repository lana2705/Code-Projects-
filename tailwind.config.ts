import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: "#1B2E5E",
        accent: "#2E7D5E",
        surface: "#F8F9FA",
        muted: "#6B7280",
        border: "#E5E7EB",
        error: "#DC2626",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      borderRadius: {
        card: "8px",
        btn: "6px",
        input: "4px",
      },
    },
  },
  plugins: [],
};
export default config;
