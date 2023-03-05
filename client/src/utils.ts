import { GraphQLClient } from "graphql-request"

export const api = new GraphQLClient(process.env.NEXT_PUBLIC_API_URL || "")
// export const api = new GraphQLClient(process.env.NEXT_PUBLIC_API_URL || "", { headers: { credentials: "include" } })

// @ts-ignore
export const fetcher: any = async ({ query, variables }) => {
  try {
    const res = await api.request(query, variables || {})
    return res
  } catch (error: any) {
    // TODO: find a better way to capture error messages from graphql
    if (error.response?.errors[0]?.message) {
      throw new Error(error.response.errors[0].message)
    } else {
      throw new Error("An unknown error occurred.")
    }
  }
}

export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ")
}

export const colors = [
  "slate",
  "gray",
  "zinc",
  "neutral",
  "stone",
  "red",
  "orange",
  "amber",
  "yellow",
  "lime",
  "green",
  "emerald",
  "teal",
  "cyan",
  "sky",
  "blue",
  "indigo",
  "violet",
  "purple",
  "fuchsia",
  "pink",
  "rose",
  "white",
]
