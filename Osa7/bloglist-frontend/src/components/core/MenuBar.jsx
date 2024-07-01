import React, { useEffect } from 'react'
import { UserContext } from '../../context'

const MenuBar = () => {
  const [username, setUsername] = React.useState('')
  const { user, setUser } = React.useContext(UserContext)

  useEffect(() => {
    if (user) {
      setUsername(user.name)
    }
  }, [user])

  const handleLogout = event => {
    event.preventDefault()
    setUser(null)
  }

  return (
    <div>
      <a href='/'>home</a>
      <a href='/users'>users</a>
      <p>
        {username} logged in
        <button onClick={handleLogout}>Log Out</button>
      </p>
    </div>
  )
}

export default MenuBar
