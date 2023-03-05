import { CloseModalArgs } from "@/types"
import { Dialog } from "@headlessui/react"
import { ReactNode } from "react"

type BaseModalProps = {
  isOpen: boolean
  onClose: (args: CloseModalArgs) => void
  title: string
  description?: string
  children: ReactNode
}

function BaseModal({ isOpen, onClose, title, description, children }: BaseModalProps) {
  return (
    <Dialog
      open={isOpen}
      onClose={() => onClose({ revalidate: false })}
      className="relative z-50">
      <div
        className="fixed inset-0 bg-black/50"
        aria-hidden="true"
      />
      <div className="fixed inset-0 px-4 overflow-y-auto md:px-0">
        <div className="flex items-center justify-center min-h-full">
          <Dialog.Panel className="w-full max-w-xl px-4 pt-4 pb-2 mx-auto bg-white shadow-md drac-radius dark:bg-slate-800 shadow-rose-700/30">
            <Dialog.Title className="mb-2 text-3xl">{title}</Dialog.Title>
            {description && <Dialog.Description className="mb-4">{description}</Dialog.Description>}
            {children}
          </Dialog.Panel>
        </div>
      </div>
    </Dialog>
  )
}

export { BaseModal }
