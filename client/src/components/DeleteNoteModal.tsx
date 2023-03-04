import { useAuth } from "@/hooks/useAuth"
import { BaseModal } from "./BaseModal"
import useSWRMutation from "swr/mutation"
import { gql } from "graphql-request"
import { classNames, fetcher } from "@/utils"
import { Note } from "@/types"

const deleteNoteMutation = gql`
  mutation DeleteNoteMutation($noteId: Float!, $email: String!) {
    deleteNote(noteId: $noteId, userEmail: $email) {
      id
    }
  }
`

type DeleteNoteModalProps = {
  isOpen: boolean
  note: Note
  onClose: ({ revalidate = false }: any) => void
}

function DeleteNoteModal({ note, isOpen, onClose }: DeleteNoteModalProps) {
  const { user } = useAuth()

  const variables = { noteId: note.id, email: user }
  const { trigger, isMutating, data } = useSWRMutation({ query: deleteNoteMutation, variables }, fetcher, {
    onSuccess: () => {
      console.log("success")
      onClose({ revalidate: true })
    },
  })

  const handleDelete = (e: any) => {
    e.preventDefault()
    trigger()
  }

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title="Are you sure?"
      description="This note will be permanently deleted.">
      <div className={classNames("relative px-8 py-10 rounded-lg shadow-lg w-80 mx-auto", `bg-${note.cardColor}-200`)}>
        <div className="flex gap-2 mb-2">
          {note.tags.map((tag) => {
            return (
              <span
                key={tag.name}
                className="px-2 py-1 text-xs font-bold text-blue-700 bg-blue-200 rounded-full">
                {tag.name}
              </span>
            )
          })}
        </div>
        <p className={classNames(`text-${note.textColor}-700`)}>{note.content}</p>
      </div>

      <div className="flex justify-end gap-4 mt-8">
        <button
          type="button"
          disabled={isMutating}
          onClick={() => onClose({ revalidate: false })}>
          Cancel
        </button>
        <button
          disabled={isMutating}
          type="button"
          onClick={handleDelete}
          className="flex items-center gap-1 px-4 py-2 text-white bg-red-500 rounded-lg cursor-pointer disabled:bg-slate-400 disabled:cursor-not-allowed">
          Delete Note
        </button>
      </div>
    </BaseModal>
  )
}

export { DeleteNoteModal }
