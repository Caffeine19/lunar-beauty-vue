/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bean: {
          900: "#C5B1B8",
          800: "#DBC5CF",
        },
        moonlight: { 900: "#B0B6C4", 800: "#E3E5ED" },
        champagne: {
          900: "#D6CEC3",
          800: "#EDEAE4",
        },
      },
    },
  },
  plugins: [
    require("@tailwindcss/container-queries"),
    // ...
  ],
};
