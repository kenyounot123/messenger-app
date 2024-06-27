/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors: {
        "messenger-blue": "#7A7AF3",
        "gradient-top": "#372F85",
        "gradient-bot": "#7b8bb7",
        "gradient-box-top": "#868F96",
        "gradient-box-bot": "#596164",
        "accent-color": "#F2DC79",
      },
    },
  },
  plugins: [],
};
