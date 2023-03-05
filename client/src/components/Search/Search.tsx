import { useState } from "react"
import { useDebounce } from "react-use"
import { LoadingRing } from "@/components/LoadingRing"

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
      {(isTyping || isLoading) && <LoadingRing />}
    </>
  )
}

export { Search }
