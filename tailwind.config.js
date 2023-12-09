/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        rajdhani: ["Rajdhani"],
        dm_sans: ["DM Sans"],
        inter: ["Inter"],
      },
    },
  },
  plugins: [require("tw-elements-react/dist/plugin.cjs")],
};
