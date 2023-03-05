import "@/styles/globals.scss"
import { Lato, Goudy_Bookletter_1911 } from "next/font/google"
import type { AppProps } from "next/app"
import AuthProvider from "@/AuthProvider"
import dynamic from "next/dynamic"
import NextNProgress from "nextjs-progressbar"
import { ThemeProvider } from "next-themes"
import { Footer } from "@/components/Footer"

// Keeps the localstorage auth fetch from causing an SSR hydration error
const Header = dynamic(() => import("../components/Header").then((mod) => mod.Header), { ssr: false })

const lato = Lato({
  weight: ["300", "400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-lato",
})
const goudy = Goudy_Bookletter_1911({
  weight: ["400"],
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-goudy",
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider
      enableSystem={true}
      attribute="class">
      <style
        jsx
        global>{`
        :root {
          --font-lato: ${lato.style.fontFamily};
          --font-goudy: ${goudy.style.fontFamily};
        }
      `}</style>
      <NextNProgress
        color="#29D"
        startPosition={0.7}
        stopDelayMs={50}
        height={3}
        showOnShallow={true}
      />
      <AuthProvider>
        <div className="flex flex-col min-h-screen">
          <Header />
          <div className="flex-grow">
            <Component {...pageProps} />
          </div>
          <Footer />
        </div>
      </AuthProvider>
    </ThemeProvider>
  )
}
