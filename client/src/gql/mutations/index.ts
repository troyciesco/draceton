import { gql } from "graphql-request"

export const createNoteMutation = gql`
  mutation CreateNoteMutation($content: String, $textColor: String, $cardColor: String, $email: String!) {
    createNote(data: { content: $content, textColor: $textColor, cardColor: $cardColor }, userEmail: $email) {
      id
      content
    }
  }
`

export const editNoteMutation = gql`
  mutation EditNoteMutation($content: String, $textColor: String, $cardColor: String, $noteId: Float!) {
    editNote(data: { content: $content, textColor: $textColor, cardColor: $cardColor }, noteId: $noteId) {
      id
      content
    }
  }
`

export const deleteNoteMutation = gql`
  mutation DeleteNoteMutation($noteId: Float!, $email: String!) {
    deleteNote(noteId: $noteId, userEmail: $email) {
      id
    }
  }
`
