import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { UserContext } from '../../context'
import Blogs from '../blogs/Blogs'
import LoginForm from '../login/LoginForm'
import UsersPage from './UsersPage'
import UserPage from './UserPage'
import BlogPage from './BlogPage'
import MenuBar from './MenuBar'
import Header from './Header'

const AppContainer = () => {
  const { user } = React.useContext(UserContext)
  return (
    <Router>
      <MenuBar />
      <Header />
      <Routes>
        <Route index element={user ? <Blogs /> : <LoginForm />} />
        <Route path='/users' element={<UsersPage />}></Route>
        <Route path='/users/:id' element={<UserPage />} />
        <Route path=':id' element={<BlogPage />} />
      </Routes>
    </Router>
  )
}

export default AppContainer