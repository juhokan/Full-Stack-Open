import { useSelector, useDispatch } from "react-redux"

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  const vote = (anecdote) => {

    const votes = anecdote.votes + 1
    dispatch({
      type: 'VOTE',
      payload: {
        content: anecdote.content,
        votes: votes,
        id: anecdote.id,
      }
    })
  }

  const sortedAnecdotes = anecdotes.slice().sort((a, b) => b.votes - a.votes)

  return (
    <>
      {sortedAnecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </>
  )
}

export default AnecdoteList