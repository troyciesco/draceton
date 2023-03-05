import { Note, Tag } from "@/types"
import { classNames } from "@/utils"
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/20/solid"
import Link from "next/link"
import { useState } from "react"
import { DeleteNoteModal } from "../DeleteNoteModal"

type NoteCardProps = {
  note: Note
  onRevalidate: any
}

function NoteCard({ note, onRevalidate }: NoteCardProps) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false)
  const handleCloseModal = ({ revalidate }: any) => {
    if (revalidate) {
      onRevalidate()
    }
    setIsDeleteModalOpen(false)
  }

  return (
    <>
      <div
        className={classNames(
          "relative px-8 py-10 transition-all rounded-lg shadow-lg w-72 md:w-80 group",
          `bg-${note.cardColor}-200`
        )}>
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
        <p className={classNames("break-words", `text-${note.textColor}-700`)}>{note.content}</p>
        <div className="absolute flex gap-2 transition-all opacity-100 lg:opacity-0 group-hover:opacity-100 bottom-4 right-4">
          <Link
            href={`/dashboard/notes?editNote=${note.id}`}
            className="cursor-pointer">
            <span className="sr-only">Edit</span>
            <PencilSquareIcon className="w-6 h-6 transition-all fill-slate-400 hover:fill-slate-800" />
          </Link>
          <button onClick={() => setIsDeleteModalOpen(true)}>
            <span className="sr-only">Delete</span>
            <TrashIcon className="w-6 h-6 transition-all fill-red-400 hover:fill-red-600" />
          </button>
        </div>
      </div>
      <DeleteNoteModal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseModal}
        note={note}
      />
    </>
  )
}

export { NoteCard }
