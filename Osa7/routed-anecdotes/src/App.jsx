import { useState, useEffect } from 'react'
import Footer from './components/Footer'
import AppContainer from './components/AppContainer'
import { AnecdoteContext } from './context'

const ANECDOTE_KEY = 'anecdotes'

const App = () => {
  const [anecdotes, setAnecdotes] = useState([])
  const [notification, setNotification] = useState('')

  useEffect(() => {
    initAnecdotes()
  }, [])

  const handleSetNotification = (content) => {
    setNotification(`a new anecdote ${content} created!`);
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  }

  const base = [
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ]

  const initAnecdotes = () => {
    const a = window.localStorage.getItem(ANECDOTE_KEY)
    if (a) {
      setAnecdotes(JSON.parse(a))
    } 
    else {
      setAnecdotes(base)
      window.localStorage.setItem(ANECDOTE_KEY, JSON.stringify(base))
    }
  }

  const setAndSaveAnecdote = (anecdote) => {
    setAnecdotes(prev => {
      const newAnecdotes = prev.concat(anecdote)
      localStorage.setItem(ANECDOTE_KEY, JSON.stringify(newAnecdotes))
      setAnecdotes(newAnecdotes)
      handleSetNotification(anecdote.content)
      return newAnecdotes
    })
  }

  return (
    <AnecdoteContext.Provider value={{ anecdotes, setAnecdotes: setAndSaveAnecdote }}>
      <h1>Software anecdotes</h1>
      {notification && <div>{notification}</div>}
      <AppContainer />
      <Footer />
    </AnecdoteContext.Provider>
  )
}

export default App
