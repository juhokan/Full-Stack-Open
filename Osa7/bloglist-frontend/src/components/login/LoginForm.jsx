import React, { useState, useContext } from 'react'
import { useMutation } from '@tanstack/react-query'
import Notification from '../notifications/Notification'
import { NotificationContext, UserContext } from '../../context'
import { ERROR, SUCCESS } from '../../model'
import { login } from '../../requests'
import {
  TextField,
  Button
} from '@mui/material'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { setUser } = useContext(UserContext)
  const { messageDispatch, setType } = useContext(NotificationContext)

  const { mutate: loginMutate } = useMutation({
    mutationFn: login,
    onSuccess: (newUser) => {
      setUser(newUser)
      resetForm()
      setType(SUCCESS)
      displayMessage('Logged in')
    },
    onError: (err) => {
      console.error(err)
      setType(ERROR)
      displayMessage('Wrong username or password')
    }
  })

  const handleLogin = event => {
    event.preventDefault()
    loginMutate({ username, password })
  }

  const resetForm = () => {
    setUsername('')
    setPassword('')
  }

  const displayMessage = (message) => {
    messageDispatch({
      type: 'MESSAGE',
      payload: message
    })
    setTimeout(() => {
      messageDispatch({
        type: 'RESET'
      })
      setType('')
    }, 2000)
  }

  return (
    <>
      <h2>Login</h2>
      <Notification/>
      <form onSubmit={handleLogin}>
        <div>
          <TextField
            type="text"
            value={username}
            name="Username"
            label="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          <TextField
            type="password"
            value={password}
            name="Password"
            label="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </>
  )
}

export default LoginForm