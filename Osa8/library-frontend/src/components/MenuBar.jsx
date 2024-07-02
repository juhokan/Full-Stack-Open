import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { TokenContext } from '../context'

const MenuBar = () => {
  const { token, setToken } = useContext(TokenContext)

  const navigate = useNavigate()

  const handleNavigate = (route) => {
    navigate(route)
  }

  const handleLogOut = (route) => {
    setToken('')
    navigate(route)
  }

  return (
    <div>
      <button onClick={() => handleNavigate('/')}>authors</button>
      <button onClick={() => handleNavigate('/books')}>books</button>
      <button onClick={() => handleNavigate('/add')}>add book</button>
      {token === ''
        ?
        <button onClick={() => handleNavigate('/login')}>login</button>
        :
        <button onClick={() => handleLogOut('/')}>log out</button>
      }
    </div>
  )
}

export default MenuBar
