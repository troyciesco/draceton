import { useAuth } from "@/hooks/useAuth"
import { BaseModal } from "./BaseModal"
import { createNoteMutation } from "@/gql/mutations"
import { NoteForm } from "../NoteForm"
import { CloseModalArgs } from "@/types"

type CreateNoteModalProps = {
  isOpen: boolean
  onClose: ({ revalidate = false }: CloseModalArgs) => void
}

function CreateNoteModal({ isOpen, onClose }: CreateNoteModalProps) {
  const { user } = useAuth()

  const baseMutationVariables = { email: user }

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={() => onClose({ revalidate: false })}
      title="Create Note">
      <NoteForm
        mutation={createNoteMutation}
        baseMutationVariables={baseMutationVariables}
        onClose={onClose}
        submitButtonText="Add Note"
      />
    </BaseModal>
  )
}

export { CreateNoteModal }
