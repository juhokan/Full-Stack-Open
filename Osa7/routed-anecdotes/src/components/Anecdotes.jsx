import React, { useEffect } from 'react'
import { AnecdoteContext } from '../context'
import { anecdoteById } from '../helpers/anecdoteHelper'

const Anecdotes = () => {
  const { anecdotes, setAnecdotes } = React.useContext(AnecdoteContext)

  const vote = (id) => {
    const anecdote = anecdoteById(id, anecdotes)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }
  useEffect(() => {
    console.log(anecdotes)
  }, [anecdotes]);

  return (
    <div>
      <h2>Anecdotes</h2>
      <ul>
        {anecdotes.map(anecdote => 
          <div key={anecdote.id}>
            <li>
              <a href={`/${anecdote.id}`}>
                {anecdote.content}
              </a>
            </li>
          </div>
        )}
      </ul>
    </div>
  )
}

export default Anecdotes
