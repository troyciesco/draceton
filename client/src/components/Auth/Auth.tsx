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

  const { trigger, isMutating } = useSWRMutation({ query: signUpMutation, variables }, fetcher, {
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
      className="flex flex-col items-center px-4 py-8 text-white shadow-lg bg-sky-900 drac-radius shadow-sky-500/70"
      onSubmit={handleSubmit}>
      <h2 className="mb-4 text-4xl text-center">Get Started</h2>
      <div className="px-8 mb-8 text-center">
        <p>This is just a demo app, so there's no real auth.</p>
        <p>
          <em className="italic text-rose-300">You can access any account!</em> Don't save real info in here.
        </p>
      </div>
      <div className="w-full mb-10">
        <label htmlFor="email">Email</label>
        <input
          type="text"
          name="email"
          className="w-full bg-white shadow-sm drac-radius bg-slate-500/20 shadow-slate-400/70 border-slate-500 placeholder:text-slate-400"
          value={email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
          placeholder="Enter your email"
        />
      </div>
      <button
        type="submit"
        className="drac-btn drac-btn--xl"
        disabled={!email || isMutating}>
        Sign In/Sign Up
      </button>
    </form>
  )
}

export { Auth }
