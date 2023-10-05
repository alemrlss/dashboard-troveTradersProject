/* eslint-disable no-undef */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      /*Si no extiendo pierdo la base de tailwind*/
      colors: {
        primary: {
          100: "#37474f",
          300: "#a8814f",
          200: "#8d3d3a"
        },
      },
    },
  },
  plugins: [require("tailwindcss-animated")],
};
