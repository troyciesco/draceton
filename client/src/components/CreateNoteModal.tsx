import { Fragment, useState } from "react"
import useSWRMutation from "swr/mutation"
import { gql } from "graphql-request"
import { classNames, colors, fetcher } from "@/utils"
import { useAuth } from "@/hooks/useAuth"
import { BaseModal } from "./BaseModal"
import { Listbox, Transition } from "@headlessui/react"
import { CheckIcon, ChevronUpDownIcon, ExclamationTriangleIcon } from "@heroicons/react/20/solid"

const createNoteMutation = gql`
  mutation CreateNoteMutation($content: String, $textColor: String, $cardColor: String, $email: String!) {
    createNote(data: { content: $content, textColor: $textColor, cardColor: $cardColor }, userEmail: $email) {
      id
      content
      tags {
        name
      }
    }
  }
`

type CreateNoteModalProps = {
  isOpen: boolean
  onClose: ({ revalidate = false }: any) => void
}

function CreateNoteModal({ isOpen, onClose }: CreateNoteModalProps) {
  const { user } = useAuth()

  const [content, setContent] = useState<string>("")
  const [textColor, setTextColor] = useState<string>("slate")
  const [cardColor, setCardColor] = useState<string>("yellow")

  const variables = { content, textColor, cardColor, email: user }
  const { trigger, isMutating, data } = useSWRMutation({ query: createNoteMutation, variables }, fetcher, {
    onSuccess: () => {
      setContent("")
      onClose({ revalidate: true })
    },
  })

  const handleSubmit = (e: any) => {
    e.preventDefault()
    trigger()
  }

  const isInvalidEntry = content.length < 20 || content.length > 300

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={() => onClose({ revalidate: false })}
      title="Create Note">
      <form
        className="mb-4"
        onSubmit={handleSubmit}>
        <div className="mb-8">
          <label className="flex flex-col">
            <span>Content</span>
            <textarea
              rows={4}
              value={content}
              className={classNames("rounded-lg shadow-sm", `text-${textColor}-700`, `bg-${cardColor}-200`)}
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
        <div className="flex justify-end gap-4 mt-8">
          <button
            type="button"
            disabled={isMutating}
            onClick={() => onClose({ revalidate: false })}>
            Cancel
          </button>
          <button
            disabled={isMutating || isInvalidEntry}
            type="submit"
            className="flex items-center gap-1 px-4 py-2 text-white bg-blue-500 rounded-lg cursor-pointer disabled:bg-slate-400 disabled:cursor-not-allowed">
            Add Note
          </button>
        </div>
      </form>
    </BaseModal>
  )
}

export { CreateNoteModal }
