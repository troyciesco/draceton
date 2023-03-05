import { useState } from "react"
import { useDebounce } from "react-use"

type SearchProps = {
  setDebouncedSearchString: (searchString: string) => void
  isLoading: boolean
}

function Search({ setDebouncedSearchString, isLoading }: SearchProps) {
  const [searchString, setSearchString] = useState("")
  const [isTyping, setIsTyping] = useState(false)

  const [, cancel] = useDebounce(
    () => {
      setIsTyping(false)
      setDebouncedSearchString(searchString)
    },
    500,
    [searchString]
  )

  return (
    <>
      <label className="w-full">
        <span className="sr-only">Search Notes</span>
        <input
          type="text"
          className="w-full bg-white rounded-lg dark:bg-white/5"
          value={searchString}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setIsTyping(true)
            setSearchString(e.currentTarget.value)
          }}
          placeholder="Search note content..."
        />
      </label>
      {(isTyping || isLoading) && (
        <div className="flex items-center justify-center">
          <div
            className="inline-block h-6 w-6 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
            role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      )}
    </>
  )
}

export { Search }
