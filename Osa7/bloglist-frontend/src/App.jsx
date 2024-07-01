import React, { useState, useEffect } from 'react'
import LoginForm from './components/LoginForm'
import Blogs from './components/Blogs'
import { UserContext, BlogContext, NotificationContext } from './context'
import '/./index.css'

const USER_JSON = 'user_json'

const App = () => {
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState(null)
  const [message, setMessage] = useState(null)
  const [type, setType] = useState(null)

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
    if (userJSON !== undefined) {
      setUser(JSON.parse(userJSON))
    }
  }

  return (
    <UserContext.Provider value={{ user, setUser: setAndSaveUser }}>
      <BlogContext.Provider value={{ blogs, setBlogs }}>
        <NotificationContext.Provider value={{ message, setMessage, type, setType }}>
          <main>{user ? <Blogs /> : <LoginForm />}</main>
        </NotificationContext.Provider>
      </BlogContext.Provider>
    </UserContext.Provider>
  )
}

export default App
