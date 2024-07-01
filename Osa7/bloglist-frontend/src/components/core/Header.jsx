import React, { useEffect } from 'react'
import Notification from '../notifications/Notification'
import { UserContext } from '../../context'

const Header = () => {
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
      <h2>Blogs</h2>
      <Notification />
      <p>
        {username} logged in
        <button onClick={handleLogout}>Log Out</button>
      </p>
    </div>
  )
}

export default Header
