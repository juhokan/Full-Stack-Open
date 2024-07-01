import React, { useState, useEffect, useReducer } from 'react'
import LoginForm from './components/LoginForm'
import Blogs from './components/Blogs'
import { UserContext, BlogContext, NotificationContext } from './context'
import '/./index.css'

const USER_JSON = 'user_json'

const App = () => {
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState(null)
  const [type, setType] = useState('')

  const messageReducer = (state, action) => {
    switch (action.type) {
    case 'MESSAGE':
      return action.payload
    case 'RESET':
      return null
    default:
      return state
    }
  }

  const [message, messageDispatch] = useReducer(messageReducer, '')

  useEffect(() => {
    initUser()
  }, [])

  const setAndSaveUser = newJSON => {
    setUser(newJSON)
    if (newJSON !== null) {
      window.localStorage.setItem(USER_JSON, JSON.stringify(newJSON))
    } else {
      window.localStorage.removeItem(USER_JSON)
    }
  }

  const initUser = () => {
    const userJSON = window.localStorage.getItem(USER_JSON)
    if (userJSON) {
      setUser(JSON.parse(userJSON))
    }
  }

  return (
    <UserContext.Provider value={{ user, setUser: setAndSaveUser }}>
      <BlogContext.Provider value={{ blogs, setBlogs }}>
        <NotificationContext.Provider value={{ message, messageDispatch, type, setType }}>
          <main>{user ? <Blogs /> : <LoginForm />}</main>
        </NotificationContext.Provider>
      </BlogContext.Provider>
    </UserContext.Provider>
  )
}

export default App
