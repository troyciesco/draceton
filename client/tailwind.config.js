const { fontFamily } = require("tailwindcss/defaultTheme")
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  safelist: [
    {
      pattern: /(text|bg|shadow)-(slate|amber|emerald|sky|violet|rose)-(200|700)/,
      variants: ["hover", "focus", "dark"],
    },
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-lato)", ...fontFamily.sans],
        serif: ["var(--font-goudy)", ...fontFamily.serif],
        creepster: ["var(--font-creepster)", ...fontFamily.serif],
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
