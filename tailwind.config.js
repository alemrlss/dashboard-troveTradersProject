/* eslint-disable no-undef */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      /*Si no extiendo pierdo la base de tailwind*/
      colors: {
        primary: {
          100: "#93c5fd",
          300: "#7F8491",
          200: "#f0f0f0",
        },
      },
    },
  },
  plugins: [require("tailwindcss-animated")],
};
