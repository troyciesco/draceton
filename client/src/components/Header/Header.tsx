import { useAuth } from "@/hooks/useAuth"
import Link from "next/link"

function Header() {
  const { user, handleLogout } = useAuth()

  return (
    <>
      <header className="relative flex items-center justify-between px-4 py-2 bg-slate-800">
        <Link
          href="/"
          className="font-serif text-4xl">
          <span className="text-rose-600">drac</span>
          <span className="text-white">eton</span>
        </Link>
        {user && (
          <>
            <p className="hidden text-white md:block">You are signed in as {user}</p>
            <div className="flex items-center gap-4">
              <Link
                href="/dashboard/notes"
                className="font-bold text-white hover:underline">
                Dashboard
              </Link>

              <button
                onClick={() => handleLogout({ shouldRedirect: true })}
                className="font-bold text-white hover:underline">
                Sign Out
              </button>
            </div>
          </>
        )}
      </header>
      {user && (
        <div className="bg-slate-800">
          <p className="block pt-2 text-center text-white md:hidden">You are signed in as {user}</p>
        </div>
      )}
    </>
  )
}

export { Header }
