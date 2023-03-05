const { fontFamily } = require("tailwindcss/defaultTheme")
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  safelist: [
    {
      pattern: /(text|bg)-(slate|amber|emerald|sky|violet|rose|white)-(200|700)/,
      variants: ["lg", "hover", "focus", "lg:hover", "dark"],
    },
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-lato)", ...fontFamily.sans],
        serif: ["var(--font-goudy)", ...fontFamily.serif],
        heading: ["var(--font-interAccent)", ...fontFamily.serif],
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/line-clamp"),
    require("@tailwindcss/aspect-ratio"),
  ],
}
