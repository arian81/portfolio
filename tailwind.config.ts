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
    themes: [
      {
        light: {
          ...require("daisyui/src/theming/themes")["[data-theme=light]"],
          accent: "#592406",
          "accent-content": "#fff",
          secondary: "#fed7aa",
          "secondary-content": "#161616",
        },
      },
    ],
  },
} satisfies Config;
