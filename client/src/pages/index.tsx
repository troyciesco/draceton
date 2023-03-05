import { DemoAccounts } from "@/components/DemoAccounts"
import dynamic from "next/dynamic"
import Head from "next/head"

const Auth = dynamic(() => import("../components/Auth").then((mod) => mod.Auth), { ssr: false })

export default function Home() {
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
          <h1 className="mb-10 font-serif leading-tight text-center dark:text-white text-7xl">
            Note-taking so good
            <br />
            <span className="text-rose-600 font-creepster">it's scary</span>
          </h1>
          <Auth />
          <DemoAccounts />
        </section>
      </main>
    </>
  )
}
