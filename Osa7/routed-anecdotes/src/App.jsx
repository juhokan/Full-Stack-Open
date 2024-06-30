import { useState, useEffect } from 'react'
import Footer from './components/Footer'
import AppContainer from './components/AppContainer'
import { AnecdoteContext } from './context'

const ANECDOTE_KEY = 'anecdotes'

const App = () => {
  const [anecdotes, setAnecdotes] = useState([])

  useEffect(() => {
    initAnecdotes()
  }, [])

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
      base.forEach(anecdote => setAndSaveAnecdote(anecdote))
    }
  }

  const setAndSaveAnecdote = (anecdote) => {
    console.log('created: ', anecdote);
    setAnecdotes(prevAnecdotes => {
      const newAnecdotes = prevAnecdotes.concat(anecdote)
      localStorage.setItem(ANECDOTE_KEY, JSON.stringify(newAnecdotes))
      setAnecdotes(newAnecdotes)
      return newAnecdotes
    })
  }

  return (
    <AnecdoteContext.Provider value={{ anecdotes, setAnecdotes: setAndSaveAnecdote }}>
      <h1>Software anecdotes</h1>
      <AppContainer />
      <Footer />
    </AnecdoteContext.Provider>
  )
}

export default App
