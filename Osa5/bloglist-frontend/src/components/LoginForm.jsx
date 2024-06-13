import React, { useState, useContext } from 'react'
import loginService from '../services/login'
import Notification from './Notification'
import { NotificationContext, UserContext } from '../context'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { setUser } = useContext(UserContext)
  const { setMessage, setType } = useContext(NotificationContext)

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const newUser = await loginService.login({ username, password })
      setUser(newUser)
      resetForm()
    } catch (err) {
      console.error(err)
      displayMessage('Wrong username or password', 'error')
    }
  }

  const resetForm = () => {
    setUsername('')
    setPassword('')
  }

  const displayMessage = (message, type) => {
    setMessage(message)
    setType(type)
    setTimeout(() => {
      setMessage(null)
      setType(null)
    }, 2000)
  }


  return (
    <>
      <h2>Login</h2>
      <Notification />
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </>
  )
}

export default LoginForm
