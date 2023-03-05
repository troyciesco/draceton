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
          className="w-full bg-white shadow-sm drac-radius border-slate-400 dark:bg-slate-500/20 shadow-slate-400/70 dark:border-slate-500 placeholder:text-slate-400"
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
