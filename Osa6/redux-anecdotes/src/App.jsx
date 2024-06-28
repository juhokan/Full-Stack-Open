import { useEffect } from 'react'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'
import Notification from './components/Notification'
import { useSelector, useDispatch } from 'react-redux'
import { initializeAnecdotes } from './reducers/anecdoteReducer'

const App = () => {
  const notification = useSelector(state => state.notification)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeAnecdotes())
  }, []);

  return (
    <>
      <h2>Anecdotes</h2>
      <Filter />
      {notification !== '' && <Notification />}
      <AnecdoteList />
      <AnecdoteForm />
    </>
  )
}

export default App