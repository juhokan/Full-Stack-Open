import React, { useState } from 'react'
import { gql, useMutation } from '@apollo/client'

const CREATE_BOOK = gql`
  mutation createBook($title: String!, $published: Int!, $author: String!, $genres: [String!]!) {
    addBook(
      title: $title,
      published: $published,
      author: $author,
      genres: $genres
    ) {
      title
      published
      author {
        name
      }
      genres
    }
  }
`

const NewBook = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  const [createBookMutation] = useMutation(CREATE_BOOK, {
    onError: (error) => {
      console.error('Mutation error:', error.message)
    },
    onCompleted: () => {
      setTitle('')
      setPublished('')
      setAuthor('')
      setGenres([])
      setGenre('')
    }
  })

  const submit = async (event) => {
    event.preventDefault()

    createBookMutation({ variables: { title, published: parseInt(published), author, genres } })
  }

  const addGenre = () => {
    if (genre.trim() !== '') {
      setGenres([...genres, genre.trim()])
      setGenre('')
    }
  }

  return (
    <div>
      <h2>Create a New Book</h2>
      <form onSubmit={submit}>
        <div>
          Title:
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
            required
          />
        </div>
        <div>
          Author:
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
            required
          />
        </div>
        <div>
          Published:
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(target.value)}
            required
          />
        </div>
        <div>
          Genre:
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button type="button" onClick={addGenre}>
            Add Genre
          </button>
        </div>
        {genres.length > 0 && (
          <div>Genres: {genres.join(', ')}</div>
        )}
        <button type="submit">Create Book</button>
      </form>
    </div>
  )
}

export default NewBook
