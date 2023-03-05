import { gql } from "graphql-request"

export const noteQuery = gql`
  query NoteQuery($noteId: Float!) {
    noteById(id: $noteId) {
      id
      content
      textColor
      cardColor
      tags {
        name
      }
    }
  }
`

export const myNotesQuery = gql`
  query MyNotesQuery($searchString: String, $email: String!) {
    myNotes(searchString: $searchString, email: $email) {
      id
      content
      textColor
      cardColor
      tags {
        name
      }
    }
  }
`
