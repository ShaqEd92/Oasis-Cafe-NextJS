/** @type {import("tailwindcss").Config} */

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "darker": "#13152a",
        "dark": "#25274d",
        "gray": "#464866",
        "light": "#aaabbb",
        "lighter": "#e8e9ed",
        "primary": "#2e9cca",
        "secondary": "#29648a",
        "contrast": "#c94259"
      }
    },
  },
  plugins: [],
};

