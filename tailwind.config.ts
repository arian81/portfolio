import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        spinSlow: "spin 8s linear infinite",
        spinDJ: "spin 6s ease infinite",
      },
    },
  },
  darkMode: "class",
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light"],
  },
} satisfies Config;
