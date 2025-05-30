/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blue: {
          50: "#f0f7ff",
          100: "#d4e8ff",
          200: "#a8ceff",
          300: "#7bb4ff",
          400: "#4f9aff",
          500: "#2a7de6",
          600: "#1f62b3",
          700: "#174a8a",
          800: "#0f3160",
          900: "#071936",
        },
        charcoal: "#1c1c1e",
        gray: {
          100: "#f5f5f5",
          200: "#e5e5e5",
          300: "#d4d4d4",
          400: "#a3a3a3",
          500: "#737373",
          600: "#525252",
          700: "#404040",
          800: "#262626",
          900: "#171717",
        },
      },
    },
  },
  plugins: [],
};
