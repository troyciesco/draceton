import { classNames, fetcher } from "@/utils"
import { ExclamationTriangleIcon } from "@heroicons/react/20/solid"
import { useEffect, useState } from "react"
import { ColorSelect } from "./ColorSelect"
import useSWRMutation from "swr/mutation"

type NoteFormProps = {
  onClose: any
  initialData?: any
  mutation: any
  baseMutationVariables?: any
  submitButtonText: string
}

function NoteForm({ initialData, mutation, baseMutationVariables = {}, onClose, submitButtonText }: NoteFormProps) {
  const [content, setContent] = useState<string>("")
  const [textColor, setTextColor] = useState<string>("")
  const [cardColor, setCardColor] = useState<string>("")
  const [errorMessage, setErrorMessage] = useState<string>("")
  const mutationVariables = { ...baseMutationVariables, content, textColor, cardColor }

  useEffect(() => {
    setContent(initialData?.content || "")
    setTextColor(initialData?.textColor || "slate")
    setCardColor(initialData?.cardColor || "amber")
  }, [initialData])

  const { trigger, isMutating } = useSWRMutation({ query: mutation, variables: mutationVariables }, fetcher, {
    onSuccess: () => {
      onClose({ revalidate: true })
      // setContent("")
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

  const isInvalidEntry = content.length < 20 || content.length > 300

  return (
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
        <ColorSelect
          color={textColor}
          label="Text Color"
          optionStyle={`text-${textColor}-700 dark:text-${textColor}-200`}
          onChange={setTextColor}
        />
        <ColorSelect
          color={cardColor}
          label="Card Color"
          optionStyle={`text-slate-800 bg-${cardColor}-200`}
          onChange={setCardColor}
        />
      </div>
      <div className="flex items-center justify-between gap-4 mt-8">
        <div>{errorMessage && <p className="font-bold text-red-600">{errorMessage}</p>}</div>
        <div className="flex justify-end gap-4 align-self-end">
          <button
            type="button"
            disabled={isMutating}
            onClick={onClose}>
            Cancel
          </button>
          <button
            disabled={isMutating || isInvalidEntry}
            type="submit"
            className="flex items-center gap-1 px-4 py-2 text-white bg-blue-500 rounded-lg cursor-pointer disabled:bg-slate-400 disabled:cursor-not-allowed">
            {submitButtonText}
          </button>
        </div>
      </div>
    </form>
  )
}

export { NoteForm }
