/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors: {
        "messenger-blue": "#7A7AF3",
        "gradient-black": "#020280",
        "gradient-grey": "#999999",
        "gradient-box-grey": "#737373",
        "gradient-box-white": "#D9D9D9",
        "accent-color": "#FFB300",
      },
    },
  },
  plugins: [],
};
