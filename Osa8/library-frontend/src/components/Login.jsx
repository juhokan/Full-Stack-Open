import React, { useState, useContext } from 'react'
import { useMutation, gql } from '@apollo/client'
import { TokenContext } from '../context'
import { useNavigate } from 'react-router-dom'

const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { setToken } = useContext(TokenContext)
  const navigate = useNavigate()
  const [login, { loading, error }] = useMutation(LOGIN, {
    onError: (error) => {
      console.error('Login error:', error)
    },
    onCompleted: (data) => {
      const token = data.login.value
      console.log(token)
      setToken(token)
    }
  })

  const handleSubmit = async (event) => {
    event.preventDefault()
    login({ variables: { username, password } })
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          Username:
          <input
            type="text"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
            required
          />
        </div>
        <div>
          Password:
          <input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            required
          />
        </div>
        <button type="submit" disabled={loading}>Login</button>
      </form>
      {error && <p>Error: {error.message}</p>}
    </div>
  )
}

export default Login
