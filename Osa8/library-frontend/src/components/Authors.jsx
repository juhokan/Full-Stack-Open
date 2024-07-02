import React, { useState } from 'react'
import { gql, useQuery, useMutation } from '@apollo/client'

const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
      id
    }
  }
`

const SET_BIRTHYEAR = gql`
  mutation setBirthyear($name: String!, $born: Int!) {
    editAuthor(name: $name, setBornTo: $born) {
      name
      born
    }
  }
`

const Authors = () => {
  const { loading, error, data } = useQuery(ALL_AUTHORS, {
    pollInterval: 2000
  })

  const [selectedAuthor, setSelectedAuthor] = useState('')
  const [birthYear, setBirthYear] = useState('')

  const [ setBirthyearMutation ] = useMutation(SET_BIRTHYEAR, {
    onError: (error) => {
      console.error('Mutation error:', error)
    }
  })

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  const handleSetBirthyear = async () => {
    if (!selectedAuthor || !birthYear) {
      return
    }
    setBirthyearMutation({ variables: { name: selectedAuthor, born: parseInt(birthYear) } })
    setSelectedAuthor('')
    setBirthYear('')
  }

  return (
    <div>
      <h2>Authors</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Born</th>
            <th>Books</th>
          </tr>
        </thead>
        <tbody>
          {data.allAuthors.map((author) => (
            <tr key={author.id}>
              <td>{author.name}</td>
              <td>{author.born}</td>
              <td>{author.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>Set birthyear</h3>
      <select
        value={selectedAuthor}
        onChange={(e) => setSelectedAuthor(e.target.value)}
      >
        <option value="">Select an author</option>
        {data.allAuthors.filter(a => !a.born).map((author) => (
          <option key={author.id} value={author.name}>{author.name}</option>
        ))}
      </select>
      <input
        type="number"
        placeholder="Enter birth year"
        value={birthYear}
        onChange={(e) => setBirthYear(e.target.value)}
      />
      <button onClick={handleSetBirthyear}>Set Birthyear</button>
    </div>
  )
}

export default Authors
