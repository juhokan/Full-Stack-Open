import { gql } from '@apollo/client'

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      _id
      title
      published
      genres
    }
  }
`

export const ALL_BOOKS = gql`
query {
  allBooks {
    _id
    title
    author {
      name
    }
    published
    genres
  }
}
`