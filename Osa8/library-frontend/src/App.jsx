/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'
import AppContainer from './components/AppContainer'
import { TokenContext } from './context'
import { gql, useApolloClient, useSubscription } from '@apollo/client'
import { ALL_BOOKS, BOOK_ADDED } from './queries'

const TOKEN = 'token'


const App = () => {
  const [token, setToken] = useState('')
  const client = useApolloClient()

  useEffect(() => {
    initToken()
  }, [])

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      const addedBook = data.data.bookAdded
      window.alert(`${addedBook.title} added`)
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
