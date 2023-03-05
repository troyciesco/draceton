import { useAuth } from "@/hooks/useAuth"
import { api, fetcher } from "@/utils"
import { gql } from "graphql-request"
import { useState } from "react"
import useSWRMutation from "swr/mutation"

const signUpMutation = gql`
  mutation SignUpMutation($email: String!) {
    signUpUser(data: { email: $email }) {
      id
      email
    }
  }
`

const findUserQuery = gql`
  query FindUserQuery($email: String!) {
    findUserByEmail(email: $email) {
      id
    }
  }
`

function Auth() {
  const { user, handleLogin, handleLogout } = useAuth()
  const [email, setEmail] = useState<string>("")

  const variables = { email }
  const { trigger, isMutating, data } = useSWRMutation({ query: signUpMutation, variables }, fetcher, {
    onSuccess: (data) => {
      handleLogin(data.signUpUser.email)
    },
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (user) {
      handleLogout({ shouldRedirect: false })
    }
    const res: any = await api.request(findUserQuery, { email })
    if (res.findUserByEmail) {
      handleLogin(email)
    } else {
      trigger()
    }
  }

  return user ? null : (
    <form
      className="flex flex-col items-center px-4 py-8 text-white rounded-lg bg-slate-700"
      onSubmit={handleSubmit}>
      <h2 className="mb-1 text-2xl text-center">Sign In/Sign Up</h2>
      <p className="mb-8">This is just a demo app, so there's no real auth. Don't save real info in here.</p>
      <div className="w-full mb-10">
        <label htmlFor="email">Email</label>
        <input
          type="text"
          name="email"
          className="w-full rounded-lg text-slate-800"
          value={email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
        />
      </div>
      <button
        type="submit"
        className="gap-1 px-6 py-4 text-lg font-bold text-center text-white bg-blue-500 rounded-lg cursor-pointer disabled:bg-slate-400 disabled:cursor-not-allowed"
        disabled={!email || isMutating}>
        Sign In/Sign Up
      </button>
    </form>
  )
}

export { Auth }
