import { useDispatch } from "react-redux"
import { create } from "../reducers/anecdoteReducer"
import { setMessage, emptyMessage } from "../reducers/notificationReducer"
import service from '../services/anecdotes'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    const newAnecdote = await service.createNew(content)
    dispatch(create(newAnecdote))
    dispatch(setMessage('new anecdote created'));
    setTimeout(() => {
      dispatch(emptyMessage());
    }, 5000);
  }
  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </>
  )
}

export default AnecdoteForm
