export type Tag = {
  name: string
}

export type Note = {
  id: any
  content: string
  textColor: string
  cardColor: string
  tags: Tag[]
}
