import { Fragment, useEffect, useState } from "react"
import { useRouter } from "next/router"
import { gql } from "graphql-request"
import { Note } from "@/types"
import { classNames, colors, fetcher } from "@/utils"
import useSWR from "swr"
import { BaseModal } from "./BaseModal"
import { useAuth } from "@/hooks/useAuth"
import useSWRMutation from "swr/mutation"
import { Listbox, Transition } from "@headlessui/react"
import { CheckIcon, ChevronUpDownIcon, ExclamationTriangleIcon } from "@heroicons/react/20/solid"

const noteQuery = gql`
  query NoteQuery($noteId: Float!) {
    noteById(id: $noteId) {
      id
      content
      textColor
      cardColor
      tags {
        name
      }
    }
  }
`
const editNoteMutation = gql`
  mutation EditNoteMutation($content: String, $textColor: String, $cardColor: String, $noteId: Float!) {
    editNote(data: { content: $content, textColor: $textColor, cardColor: $cardColor }, noteId: $noteId) {
      id
      content
      tags {
        name
      }
    }
  }
`

type EditNoteModalProps = {
  isOpen: boolean
  onClose: ({ revalidate = false }: any) => void
}

function EditNoteModal({ isOpen, onClose }: EditNoteModalProps) {
  const router = useRouter()
  const shouldFetch = router.query.editNote
  // @ts-ignore
  const variables = { noteId: parseInt(router.query.editNote) }
  const { data } = useSWR<Record<"noteById", Note>>(shouldFetch ? { query: noteQuery, variables } : null, fetcher)

  const [content, setContent] = useState<string>("")
  const [textColor, setTextColor] = useState<string>("")
  const [cardColor, setCardColor] = useState<string>("")
  const [errorMessage, setErrorMessage] = useState<string>("")
  // @ts-ignore
  const mutationVariables = { content, textColor, cardColor, noteId: parseInt(router.query.editNote) }

  useEffect(() => {
    setContent(data?.noteById?.content || "")
    setTextColor(data?.noteById?.textColor || "slate")
    setCardColor(data?.noteById?.cardColor || "yellow")
  }, [data])

  const {
    trigger,
    isMutating,
    data: mutationData,
  } = useSWRMutation({ query: editNoteMutation, variables: mutationVariables }, fetcher, {
    onSuccess: () => {
      onClose({ revalidate: true })
      setContent("")
      setErrorMessage("")
    },
    onError: (error) => {
      setErrorMessage(error.message)
    },
  })

  const handleSubmit = (e: any) => {
    e.preventDefault()
    trigger()
  }

  const handleClose = () => {
    setErrorMessage("")
    onClose({ revalidate: false })
  }

  const isInvalidEntry = content.length < 20 || content.length > 300

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={handleClose}
      title="Edit Note">
      <form
        className="mb-8"
        onSubmit={handleSubmit}>
        <div className="mb-8">
          <label className="flex flex-col">
            <span>Content</span>
            <textarea
              rows={6}
              value={content}
              className={classNames(`text-${textColor}-700`, `bg-${cardColor}-200`)}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value)}
            />
          </label>
          <div className="flex justify-between">
            <span className="text-sm">Must be between 20 and 300 characters.</span>
            <div className={classNames("flex items-center gap-1", isInvalidEntry ? "font-bold text-red-600" : "")}>
              {isInvalidEntry && <ExclamationTriangleIcon className="w-4 h-4" />}
              {content.length}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-8 mb-8">
          <Listbox
            value={textColor}
            onChange={setTextColor}>
            <div className="relative mt-1">
              <Listbox.Label>Text Color</Listbox.Label>
              <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                <span className={classNames("block truncate", `text-${textColor}-700`)}>{textColor}</span>
                <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <ChevronUpDownIcon
                    className="w-5 h-5 text-gray-400"
                    aria-hidden="true"
                  />
                </span>
              </Listbox.Button>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0">
                <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {colors.map((color) => (
                    <Listbox.Option
                      key={color}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                          active ? "bg-amber-100 text-amber-900" : "text-gray-900"
                        }`
                      }
                      value={color}>
                      {({ selected }) => (
                        <>
                          <span className={`block truncate ${selected ? "font-medium" : "font-normal"}`}>{color}</span>
                          {selected ? (
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                              <CheckIcon
                                className="w-5 h-5"
                                aria-hidden="true"
                              />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </Listbox>
          <Listbox
            value={cardColor}
            onChange={setCardColor}>
            <div className="relative mt-1">
              <Listbox.Label>Card Color</Listbox.Label>
              <Listbox.Button
                className={classNames(
                  "relative w-full py-2 pl-3 pr-10 text-left rounded-lg shadow-md cursor-default focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm",
                  `bg-${cardColor}-200`
                )}>
                <span className="block truncate">{cardColor}</span>
                <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <ChevronUpDownIcon
                    className="w-5 h-5 text-gray-400"
                    aria-hidden="true"
                  />
                </span>
              </Listbox.Button>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0">
                <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {colors.map((color) => (
                    <Listbox.Option
                      key={color}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                          active ? "bg-amber-100 text-amber-900" : "text-gray-900"
                        }`
                      }
                      value={color}>
                      {({ selected }) => (
                        <>
                          <span className={`block truncate ${selected ? "font-medium" : "font-normal"}`}>{color}</span>
                          {selected ? (
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                              <CheckIcon
                                className="w-5 h-5"
                                aria-hidden="true"
                              />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </Listbox>
        </div>
        <div className="flex items-center justify-between w-full mt-8">
          <div>{errorMessage && <p className="font-bold text-red-600">{errorMessage}</p>}</div>
          <div className="flex justify-end gap-4 align-self-end">
            <button
              type="button"
              disabled={isMutating}
              onClick={handleClose}>
              Cancel
            </button>
            <button
              disabled={isMutating || isInvalidEntry}
              type="submit"
              className="flex items-center gap-1 px-4 py-2 text-white bg-blue-500 rounded-lg cursor-pointer disabled:bg-slate-400 disabled:cursor-not-allowed">
              Update Note
            </button>
          </div>
        </div>
      </form>
    </BaseModal>
  )
}

export { EditNoteModal }
