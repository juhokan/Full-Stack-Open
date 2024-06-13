/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from 'react'
import Blog from './Blog'
import blogService from '../services/blogs'
import { BlogContext, UserContext, NotificationContext } from '../context'
import CreateBlog from './CreateBlog'
import Notification from './Notification'

const Blogs = () => {
  const { blogs, setBlogs } = useContext(BlogContext)
  const { user, setUser } = useContext(UserContext)
  const [username, setUsername] = useState('')
  const [isVisible, setIsVisible] = useState(false)
  const { message, type } = useContext(NotificationContext)


  useEffect(() => {
    try {
      setUsername(user.name)
    } catch (error) {
      console.error(error)
    }
    fetchBlogs()
  }, [user])

  const fetchBlogs = async () => {
    try {
      const blogsData = await blogService.getAll()
      setBlogs(blogsData)
    } catch (error) {
      console.error(error)
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    setUser(null)
  }

  const toggleVisibility = () => {
    setIsVisible(!isVisible)
  }

  return (
    <>
      <h2>Blogs</h2>
      <Notification message={message} type={type}/>
      <p>
        {username} logged in
        <button onClick={handleLogout}>Log Out</button>
      </p>
      {isVisible && <CreateBlog />}

      {isVisible ? <button onClick={toggleVisibility}>Cancel</button> : <button onClick={toggleVisibility}>New blog</button>}

      {Array.isArray(blogs) && blogs.sort((a, b) => b.likes - a.likes).map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </>
  )
}

export default Blogs
