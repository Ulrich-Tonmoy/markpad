/** @type {import('tailwindcss').Config} */
export default {
  content: ["./components/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        thumb: "var(--thumb)",
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        active: "var(--active)",
        hover: "var(--hover)",
        border: "var(--border)",
        text: "var(--text)",
        cursor: "var(--cursor)",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
