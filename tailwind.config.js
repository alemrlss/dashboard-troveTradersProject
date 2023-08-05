/* eslint-disable no-undef */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      /*Si no extiendo pierdo la base de tailwind*/
      colors: {
        primary: {
          100: "#37474f",
        },
      },
    },
  },
  plugins: [require("tailwindcss-animated")],
};
