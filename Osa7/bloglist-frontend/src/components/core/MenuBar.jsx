import React, { useEffect } from 'react'
import { UserContext } from '../../context'
import { useNavigate, Link } from 'react-router-dom'
import {
  AppBar,
  Toolbar,
  Button
} from '@mui/material'

const MenuBar = () => {
  const [username, setUsername] = React.useState('')
  const { user, setUser } = React.useContext(UserContext)
  const navigate = useNavigate()

  useEffect(() => {
    if (user) {
      setUsername(user.name)
    }
  }, [user])

  const handleLogout = event => {
    event.preventDefault()
    setUser(null)
    navigate('/')
  }

  return (
    <div>
      {user &&
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit" component={Link} to="/">
          Home
          </Button>
          <Button color="inherit" component={Link} to="/users">
          Users
          </Button>
          <Button color="inherit" component={Link} to="/" onClick={handleLogout}>
          Log Out
          </Button>
        </Toolbar>
      </AppBar>}
    </div>
  )
}

export default MenuBar
