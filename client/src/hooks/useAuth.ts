import { useRouter } from "next/router"
import { createContext, useContext, useEffect, useState } from "react"
import { useSWRConfig } from "swr"
import { useCookie } from "./useCookie"

const fakeAuth = {
  isAuthenticated: false,
  signin(cb: any) {
    fakeAuth.isAuthenticated = true
    setTimeout(cb, 100) // fake async
  },
  signout(cb: any) {
    fakeAuth.isAuthenticated = false
    setTimeout(cb, 100)
  },
}

export const AuthContext = createContext({
  user: "",
  isAuthLoading: false,
  handleLogin: (email: string) => {},
  handleLogout: ({ shouldRedirect }: any) => {},
})

export function useAuth() {
  return useContext(AuthContext)
}

export function useProvideAuth() {
  const { mutate } = useSWRConfig()
  const { getCookie, setCookie, removeCookie } = useCookie()
  const [user, setUser] = useState<string | null>(getCookie("activeUser"))
  const [isAuthLoading, setIsAuthLoading] = useState<boolean>(true)

  useEffect(() => {
    setUser(getCookie("activeUser"))
    setIsAuthLoading(false)
  }, [])

  const router = useRouter()

  const handleLogin = (email: string): void => {
    return fakeAuth.signin(() => {
      setCookie("activeUser", email)
      setUser(email)
      router.push("/dashboard/notes")
    })
  }

  const handleLogout = ({ shouldRedirect = true }): void => {
    return fakeAuth.signout(() => {
      removeCookie("activeUser")
      mutate(
        (key) => true, // which cache keys are updated
        undefined, // update cache data to `undefined`
        { revalidate: false } // do not revalidate
      )
      setUser("")
      shouldRedirect && router.push("/")
    })
  }

  return {
    user,
    isAuthLoading,
    handleLogin,
    handleLogout,
  }
}
