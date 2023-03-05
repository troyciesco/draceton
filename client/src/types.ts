export type Note = {
  id: number
  content: string
  textColor: string
  cardColor: string
}

export type LogoutArgs = {
  shouldRedirect: boolean
}

export type CloseModalArgs = {
  revalidate: boolean
}
