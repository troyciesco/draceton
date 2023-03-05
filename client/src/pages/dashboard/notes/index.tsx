import { CreateNoteModal, EditNoteModal } from "@/components/Modals"
import { LoadingCards } from "@/components/LoadingCards"
import { NoteCard } from "@/components/NoteCard"
import { useAuth } from "@/hooks/useAuth"
import { Note } from "@/types"
import { fetcher } from "@/utils"
import { PlusIcon } from "@heroicons/react/20/solid"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { useDebounce } from "react-use"
import useSWR, { useSWRConfig } from "swr"
import { myNotesQuery } from "@/gql/queries"

export default function Dashboard() {
  const router = useRouter()
  const { mutate } = useSWRConfig()
  const { user, isAuthLoading } = useAuth()
  const [searchString, setSearchString] = useState("")
  const [debouncedSearchString, setDebouncedSearchString] = useState("")
  const [isTyping, setIsTyping] = useState(false)

  const variables = { searchString: debouncedSearchString, email: user }
  const { data, error, isLoading } = useSWR<Record<"myNotes", Note[]>>(
    user ? { query: myNotesQuery, variables } : null,
    fetcher
  )

  const handleCloseModal = ({ revalidate }: any) => {
    if (revalidate) {
      mutate({ query: myNotesQuery, variables })
    }
    router.push("/dashboard/notes")
  }

  useEffect(() => {
    if (!(user || isAuthLoading)) {
      router.push("/")
    }
  }, [user, isAuthLoading, router])

  const [, cancel] = useDebounce(
    () => {
      setIsTyping(false)
      setDebouncedSearchString(searchString)
    },
    500,
    [searchString]
  )

  return !user || isAuthLoading ? null : (
    <>
      <Head>
        <title>Dashboard | Draceton</title>
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
        <div className="pt-10 page-container">
          <div className="flex items-center justify-between mb-10">
            <h1 className="font-serif text-4xl">My Notes</h1>
            <Link
              href="/dashboard/notes?create=true"
              className="flex items-center gap-1 px-4 py-2 text-white bg-blue-500 rounded-lg">
              Add New Note <PlusIcon className="w-6 h-6" />
            </Link>
          </div>
          <section className="flex items-center max-w-3xl gap-4 mx-auto mb-5">
            {!(data?.myNotes && data?.myNotes.length === 0 && !isLoading && !debouncedSearchString) && (
              <label className="w-full">
                <span className="sr-only">Search Notes</span>
                <input
                  type="text"
                  className="w-full bg-white rounded-lg dark:bg-white/5"
                  value={searchString}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setIsTyping(true)
                    setSearchString(e.currentTarget.value)
                  }}
                  placeholder="Search note content..."
                />
              </label>
            )}
            {(isTyping || isLoading) && (
              <div className="flex items-center justify-center">
                <div
                  className="inline-block h-6 w-6 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                  role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
            )}
          </section>
          <section className="mb-20">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 justify-items-center">
              {isLoading && <LoadingCards />}
              {data?.myNotes &&
                !isLoading &&
                data.myNotes.map((note: Note) => {
                  return (
                    <NoteCard
                      key={note.id}
                      note={note}
                      onRevalidate={() => mutate({ query: myNotesQuery, variables })}
                    />
                  )
                })}
            </div>
            <div>
              {data?.myNotes && data?.myNotes.length === 0 && !isLoading && debouncedSearchString && (
                <p>No notes match your search parameters.</p>
              )}
              {data?.myNotes && data?.myNotes.length === 0 && !isLoading && !debouncedSearchString && (
                <p>No notes yet!</p>
              )}
            </div>
          </section>
        </div>
      </main>
      <CreateNoteModal
        isOpen={!!router.query.create}
        onClose={handleCloseModal}
      />
      <EditNoteModal
        isOpen={!!router.query.editNote}
        onClose={handleCloseModal}
      />
    </>
  )
}
