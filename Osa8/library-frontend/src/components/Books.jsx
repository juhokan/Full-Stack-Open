import React, { useState, useEffect } from 'react'
import { useQuery, gql } from '@apollo/client'
import { ALL_BOOKS } from '../queries'


const Books = () => {
  const { loading, error, data } = useQuery(ALL_BOOKS, {
    pollInterval: 2000
  })
  const [selectedGenre, setSelectedGenre] = useState('')
  const [genresList, setGenresList] = useState([])

  useEffect(() => {
    if (data && data.allBooks) {
      const genres = new Set()
      data.allBooks.forEach(book => {
        book.genres.forEach(genre => genres.add(genre))
      })
      setGenresList(Array.from(genres))
    }
  }, [data])

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  const handleGenreChange = (event) => {
    setSelectedGenre(event.target.value)
  }

  const filteredBooks = selectedGenre
    ? data.allBooks.filter(book => book.genres.includes(selectedGenre))
    : data.allBooks

  return (
    <div>
      <h2>Books</h2>
      <div>
        <label htmlFor="genre">Choose a genre:</label>
        <select id="genre" value={selectedGenre} onChange={handleGenreChange}>
          <option value="">All Genres</option>
          {genresList.map(genre => (
            <option key={genre} value={genre}>{genre}</option>
          ))}
        </select>
      </div>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Published</th>
            <th>Genres</th>
          </tr>
        </thead>
        <tbody>
          {filteredBooks.map(book => (
            <tr key={book._id}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
              <td>{book.genres.join(', ')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Books
