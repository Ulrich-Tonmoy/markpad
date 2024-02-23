/** @type {import('tailwindcss').Config} */
export default {
  content: ["./components/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "var(--primary)",
        text: "var(--text)",
        editor: "var(--editor)",
        active: "var(--active)",
        hover: "var(--hover)",
        border: "var(--border)",
        cursor: "var(--cursor)",
        thumb: "var(--thumb)",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
