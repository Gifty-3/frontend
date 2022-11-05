/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        gift3: {
          primary: "#2563eb",
          secondary: "#facc15",
          accent: "#f472b6",
          neutral: "#1f2937",
          "base-100": "#000000",
          info: "#3ABFF8",
          success: "#a3e635",
          warning: "#FBBD23",
          error: "#b91c1c",
        },
      },
    ],
  },
};
