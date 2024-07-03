import React, { useContext, useEffect, useState } from 'react'
import { gql, useQuery } from '@apollo/client'
import { TokenContext } from '../context'

const CURRENT_USER = gql`
  query {
    me {
      favoriteGenre
    }
  }
`

const GENRE_BOOKS = gql`
  query AllBooks($genre: String) {
  allBooks(genre: $genre) {
    _id
    title
    genres
    author {
      name
      born
    }
    published
  }
}
`

const Recommendations = () => {
  const { token } = useContext(TokenContext)
  const [books, setBooks] = useState(null)
  const [genre, setGenre] = useState('')

  const { data: userData } = useQuery(CURRENT_USER, {
    context: {
      headers: {
        authorization: token ? `Bearer ${token}` : '',
      },
    },
    onCompleted(data) {
      setGenre(data?.me.favoriteGenre)
    },
    pollInterval: 100
  })

  const { data: bookData } = useQuery(GENRE_BOOKS, {
    variables: { genre: genre },
    onError: (error) => {
      console.error('Error fetching books:', error)
    },
    onCompleted(data) {
      setBooks(data.allBooks)
    }
  })

  return (
    <div>
      <h2>Recommendations</h2>
      {userData?.me.favoriteGenre && (
        <div>
          <p>Favorite Genre: {userData?.me.favoriteGenre || 'none'}</p>
        </div>
      )}
      <div>
        {bookData && books?.map(book => (
          <li key={book._id}>
            {book.title} by {book.author.name} (Published: {book.published})
          </li>
        ))}
      </div>
    </div>
  )
}

export default Recommendations
