/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'
import AppContainer from './components/AppContainer'
import { TokenContext } from './context'
import { useSubscription } from '@apollo/client'
import { BOOK_ADDED } from './queries'

const TOKEN = 'token'


const App = () => {
  const [token, setToken] = useState('')

  useEffect(() => {
    initToken()
  }, [])

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      const addedBook = data.data.bookAdded
      window.alert(`${addedBook.title} added`)
      console.log(`${addedBook.title} added`)
    }
  })

  const initToken = () => {
    const t = window.localStorage.getItem(TOKEN)
    if (t) {
      setAndSaveToken(t)
    }
  }

  const setAndSaveToken = (t) => {
    window.localStorage.removeItem(TOKEN)
    if (t) {
      setToken(t)
      window.localStorage.setItem(TOKEN, t)
    }
  }

  return (
    <TokenContext.Provider value={{ token, setToken: setAndSaveToken }}>
      <AppContainer />
    </TokenContext.Provider>
  )
}

export default App
