import { useRouter } from "next/router"
import { CloseModalArgs, Note } from "@/types"
import { fetcher } from "@/utils"
import useSWR from "swr"
import { BaseModal } from "./BaseModal"
import { noteQuery } from "@/gql/queries"
import { editNoteMutation } from "@/gql/mutations"
import { NoteForm } from "../NoteForm"
import { LoadingRing } from "@/components/LoadingRing"

type EditNoteModalProps = {
  isOpen: boolean
  onClose: ({ revalidate = false }: CloseModalArgs) => void
}

function EditNoteModal({ isOpen, onClose }: EditNoteModalProps) {
  const router = useRouter()
  const noteId = parseInt(router.query.editNote as string)
  const shouldFetch = !!noteId
  const variables = { noteId }
  const { data, isLoading } = useSWR<Record<"noteById", Note>>(
    shouldFetch ? { query: noteQuery, variables } : null,
    fetcher
  )

  const handleClose = () => {
    onClose({ revalidate: false })
  }

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
          baseMutationVariables={variables}
          onClose={onClose}
          submitButtonText="Update Note"
        />
      )}
    </BaseModal>
  )
}

export { EditNoteModal }
