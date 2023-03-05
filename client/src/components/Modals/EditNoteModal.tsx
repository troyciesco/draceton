import { useRouter } from "next/router"
import { Note } from "@/types"
import { fetcher } from "@/utils"
import useSWR from "swr"
import { BaseModal } from "./BaseModal"
import { noteQuery } from "@/gql/queries"
import { editNoteMutation } from "@/gql/mutations"
import { NoteForm } from "../NoteForm"
import { LoadingRing } from "@/components/LoadingRing"

type EditNoteModalProps = {
  isOpen: boolean
  onClose: ({ revalidate = false }: any) => void
}

function EditNoteModal({ isOpen, onClose }: EditNoteModalProps) {
  const router = useRouter()
  const shouldFetch = router.query.editNote
  // @ts-ignore
  const variables = { noteId: parseInt(router.query.editNote) }
  const { data, isLoading } = useSWR<Record<"noteById", Note>>(
    shouldFetch ? { query: noteQuery, variables } : null,
    fetcher
  )

  const handleClose = () => {
    onClose({ revalidate: false })
  }

  // @ts-ignore
  const baseMutationVariables = { noteId: parseInt(router.query.editNote) }

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={handleClose}
      title="Edit Note">
      {isLoading ? (
        <LoadingRing />
      ) : (
        <NoteForm
          initialData={data?.noteById}
          mutation={editNoteMutation}
          baseMutationVariables={baseMutationVariables}
          onClose={onClose}
          submitButtonText="Update Note"
        />
      )}
    </BaseModal>
  )
}

export { EditNoteModal }
