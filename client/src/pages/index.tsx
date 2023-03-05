import { useAuth } from "@/hooks/useAuth"
import dynamic from "next/dynamic"
import Head from "next/head"

const Auth = dynamic(() => import("../components/Auth").then((mod) => mod.Auth), { ssr: false })

export default function Home() {
  const { user, handleLogin, handleLogout } = useAuth()

  const switchUser = (newUser: string) => {
    if (user) {
      handleLogout({ shouldRedirect: false })
    }
    handleLogin(newUser)
  }

  return (
    <>
      <Head>
        <title>Draceton</title>
        <meta
          name="description"
          content="Note-taking so good it's scary"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
        <link
          rel="icon"
          href="/favicon.ico"
        />
      </Head>
      <main>
        <section className="flex flex-col items-center justify-center min-h-[80vh] px-2 bg-white dark:bg-slate-800">
          <h1 className="mb-10 font-serif text-center dark:text-white text-7xl">
            Note-taking so good
            <br />
            <span className="text-red-600">it's scary</span>
          </h1>
          <Auth />
          <div className="mt-10">
            <h2 className="dark:text-white">Demo Accounts</h2>
            <div className="flex items-center gap-4">
              <button
                onClick={() => switchUser("jonathan.harker@mailinator.com")}
                className="flex items-center gap-1 px-4 py-2 text-white bg-blue-500 rounded-lg">
                Jonathan Harker
              </button>
              <button
                onClick={() => switchUser("mina.harker@mailinator.com")}
                className="flex items-center gap-1 px-4 py-2 text-white bg-blue-500 rounded-lg">
                Mina Harker
              </button>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
