/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
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
                    ...require("daisyui/src/colors/themes")[
                        "[data-theme=light]"
                    ],
                    accent: "#592406",
                    "accent-content": "#fff",
                    secondary: "#fed7aa",
                    "secondary-content": "#161616",
                },
            },
        ],
    },
};
