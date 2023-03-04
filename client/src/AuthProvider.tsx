import { ReactNode } from "react"
import { AuthContext, useProvideAuth } from "@/hooks/useAuth"

type AuthProviderProps = {
  children: ReactNode
}

export default function AuthProvider({ children }: AuthProviderProps): JSX.Element {
  const auth = useProvideAuth()

  // @ts-ignore
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}
