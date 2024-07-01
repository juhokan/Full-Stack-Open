import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { UserContext } from '../../context'
import Blogs from '../blogs/Blogs'
import LoginForm from '../login/LoginForm'
import UsersPage from './UsersPage'

const AppContainer = () => {
  const { user } = React.useContext(UserContext)
  return (
    <Router>
      <Routes>
        <Route index element={user ? <Blogs /> : <LoginForm />} />
        <Route path='/users' element={<UsersPage />} />
      </Routes>
    </Router>
  )
}

export default AppContainer