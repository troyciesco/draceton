import { useAuth } from "@/hooks/useAuth"
import { BaseModal } from "./BaseModal"
import useSWRMutation from "swr/mutation"
import { classNames, fetcher } from "@/utils"
import { CloseModalArgs, Note } from "@/types"
import { deleteNoteMutation } from "@/gql/mutations"
import { FormEvent } from "react"

type DeleteNoteModalProps = {
  isOpen: boolean
  note: Note
  onClose: ({ revalidate = false }: CloseModalArgs) => void
}

function DeleteNoteModal({ note, isOpen, onClose }: DeleteNoteModalProps) {
  const { user } = useAuth()

  const variables = { noteId: note.id, email: user }
  const { trigger, isMutating } = useSWRMutation({ query: deleteNoteMutation, variables }, fetcher, {
    onSuccess: () => {
      onClose({ revalidate: true })
    },
  })

  const handleDelete = (e: FormEvent) => {
    e.preventDefault()
    trigger()
  }

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title="Are you sure?"
      description="This note will be permanently deleted.">
      <div className={classNames("relative px-8 py-10 drac-radius shadow-lg w-80 mx-auto", `bg-${note.cardColor}-200`)}>
        <p className={classNames("break-words", `text-${note.textColor}-700`)}>{note.content}</p>
      </div>

      <div className="flex justify-end gap-4 mt-8">
        <button
          type="button"
          disabled={isMutating}
          onClick={() => onClose({ revalidate: false })}>
          Cancel
        </button>
        <form onSubmit={handleDelete}>
          <button
            disabled={isMutating}
            type="submit"
            className="drac-btn drac-btn--danger">
            {isMutating ? "Deleting..." : "Delete Note"}
          </button>
        </form>
      </div>
    </BaseModal>
  )
}

export { DeleteNoteModal }
