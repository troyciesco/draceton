import { MoonIcon, SunIcon } from "@heroicons/react/20/solid"
import { useTheme } from "next-themes"
import { useState, useEffect } from "react"

function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState<boolean>(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  return (
    <button
      className="flex items-center justify-center w-8 h-8 transition-all duration-300 bg-sky-100 drac-radius dark:bg-slate-800 hover:ring-2 ring-sky-400 focus:outline-none"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      aria-label="Toggle Dark Mode">
      {theme === "light" ? <MoonIcon className="w-5 h-5 text-sky-500" /> : <SunIcon className="w-5 h-5 text-sky-400" />}
    </button>
  )
}

export { ThemeToggle }
