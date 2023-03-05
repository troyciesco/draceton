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
import useSWR, { useSWRConfig } from "swr"
import { myNotesQuery } from "@/gql/queries"
import { Search } from "@/components/Search"

export default function Dashboard() {
  const router = useRouter()
  const { mutate } = useSWRConfig()
  const { user, isAuthLoading } = useAuth()

  const [debouncedSearchString, setDebouncedSearchString] = useState("")

  const variables = { searchString: debouncedSearchString, email: user }

  const { data, isLoading } = useSWR<Record<"myNotes", Note[]>>(
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

  const shouldShowSearch = !(data?.myNotes && data?.myNotes.length === 0 && !isLoading && !debouncedSearchString)

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
              className="drac-btn">
              Add New Note <PlusIcon className="w-6 h-6" />
            </Link>
          </div>
          <section className="flex items-center max-w-3xl gap-4 mx-auto mb-10">
            {shouldShowSearch && (
              <Search
                setDebouncedSearchString={setDebouncedSearchString}
                isLoading={isLoading}
              />
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
