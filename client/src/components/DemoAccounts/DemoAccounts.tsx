import { useAuth } from "@/hooks/useAuth"

function DemoAccounts() {
  const { user, handleLogin, handleLogout } = useAuth()

  const switchUser = (newUser: string) => {
    if (user) {
      handleLogout({ shouldRedirect: false })
    }
    handleLogin(newUser)
  }

  return (
    <div className="w-full max-w-2xl mx-auto mt-10">
      <h2 className="mb-4 font-serif text-2xl dark:text-white">Demo Accounts</h2>
      <div className="flex items-center gap-4">
        <button
          onClick={() => switchUser("jonathan.harker@mailinator.com")}
          className="drac-btn">
          Jonathan Harker
        </button>
        <button
          onClick={() => switchUser("lucy.westerna@mailinator.com")}
          className="drac-btn">
          Lucy Westerna
        </button>
      </div>
    </div>
  )
}

export { DemoAccounts }
