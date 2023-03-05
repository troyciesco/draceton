import { Fragment } from "react"
import { classNames, colors } from "@/utils"
import { Listbox, Transition } from "@headlessui/react"
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid"

type ColorSelectProps = {
  color: string | number
  label: string | number
  onChange: any
  optionStyle: any
}

function ColorSelect({ color, optionStyle, label, onChange }: ColorSelectProps) {
  return (
    <Listbox
      value={color}
      onChange={onChange}>
      <div className="relative mt-1">
        <Listbox.Label>{label}</Listbox.Label>
        <Listbox.Button
          className={classNames(
            "relative w-full py-2 pl-3 pr-10 text-left drac-radius shadow-md cursor-default sm:text-sm",
            optionStyle
          )}>
          <span className="block truncate">{color}</span>
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
          <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 sm:text-sm">
            {colors.map((color) => (
              <Listbox.Option
                key={color}
                className={({ active }) =>
                  classNames(
                    "relative cursor-default select-none py-2 pl-10 pr-4",
                    active ? `bg-${color}-200 text-${color}-700` : "text-gray-900"
                  )
                }
                value={color}>
                {({ selected }) => (
                  <>
                    <span className={`block truncate ${selected ? "font-medium" : "font-normal"}`}>{color}</span>
                    {selected ? (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-800">
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
  )
}

export { ColorSelect }
