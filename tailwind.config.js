/** @type {import("tailwindcss").Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#fff4ef",
          100: "#ffe6dc",
          200: "#fbc8b7",
          300: "#f3a58d",
          400: "#e77d60",
          500: "#d9694b",
          600: "#c45438",
          700: "#a84430",
          800: "#883a2d",
          900: "#713329",
        },
        ink: {
          50: "#f7f6f2",
          100: "#ebe9e2",
          200: "#d8d5cc",
          700: "#3f403c",
          800: "#292a27",
          900: "#1d1e1b",
        },
        sage: {
          50: "#f2f6f0",
          100: "#e2ecdf",
          500: "#71866b",
          600: "#5c7257",
          700: "#4a5d46",
        },
      },
      boxShadow: {
        soft: "0 10px 30px rgba(45, 42, 36, 0.08)",
        lift: "0 18px 45px rgba(45, 42, 36, 0.12)",
      },
      borderRadius: {
        "2xl": "1.25rem",
      },
    },
  },
  plugins: [],
};
