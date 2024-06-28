import { useSelector, useDispatch } from 'react-redux'

const App = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  const generateId = () => (100000 * Math.random()).toFixed(0)

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

  const addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(createAnecdote(content))
  }

  const createAnecdote = (content) => {
    return {
      type: 'CREATE',
      payload: {
        content,
        votes: 0,
        id: generateId()
      }
    }
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
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
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <input name="anecdote" /> 
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default App