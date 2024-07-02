import React from 'react'
import { useNavigate } from 'react-router-dom'

const MenuBar = () => {
  const navigate = useNavigate()

  const handleNavigate = (route) => {
    navigate(route)
  }

  return (
    <div>
      <button onClick={() => handleNavigate('/')}>authors</button>
      <button onClick={() => handleNavigate('/books')}>books</button>
      <button onClick={() => handleNavigate('/add')}>add book</button>
    </div>
  )
}

export default MenuBar
