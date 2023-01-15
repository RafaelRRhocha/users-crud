/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "src/pages/**/*.{js,ts,jsx,tsx}",
    "src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bgbody: 'linear-gradient(90deg, rgba(4,1,10,1) 0%, rgba(15,4,36,1) 100%)'
      }
    },
  },
  plugins: [require("daisyui")],
}
