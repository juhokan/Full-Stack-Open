import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { anecdoteById } from '../helpers/anecdoteHelper';
import { AnecdoteContext } from '../context';

const Anecdote = () => {
  const id = useParams().id
  const { anecdotes } = React.useContext(AnecdoteContext)
  const [current, setCurrent] = React.useState();

  useEffect(() => {
    const f = anecdoteById(id, anecdotes)
    setCurrent(f)
  }, [anecdotes, id]);

  return (
    <>{current && 
    <div>
      <h2>
        {current.content}
      </h2>
      <div>
      has {current.votes} votes
      </div>
    </div>
    }</>
  )
}

export default Anecdote
