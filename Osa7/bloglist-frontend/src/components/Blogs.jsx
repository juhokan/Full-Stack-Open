/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from 'react'
import Blog from './Blog'
import { BlogContext, UserContext } from '../context'
import { useQuery } from '@tanstack/react-query'
import CreateBlog from './CreateBlog'
import Notification from './Notification'
import { getBlogs } from '../requests'

const Blogs = () => {
  const { blogs, setBlogs } = useContext(BlogContext)
  const { user, setUser } = useContext(UserContext)
  const [username, setUsername] = useState('')
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    try {
      setUsername(user.name)
    } catch (error) {
      console.error(error)
    }
  }, [user])

  const handleLogout = event => {
    event.preventDefault()
    setUser(null)
  }

  const toggleVisibility = () => {
    setIsVisible(!isVisible)
  }

  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: getBlogs,
    retry: 1
  })

  console.log(JSON.parse(JSON.stringify(result)))

  if (result.isLoading) {
    return <div>loading data...</div>
  }

  if (result.isError) {
    return <div>blog service is not available due to problems in the server</div>
  }

  setBlogs(result.data)

  return (
    <>
      <h2>Blogs</h2>
      <Notification />
      <p>
        {username} logged in
        <button onClick={handleLogout}>Log Out</button>
      </p>
      {isVisible && <CreateBlog />}

      {isVisible ? (
        <button onClick={toggleVisibility}>Cancel</button>
      ) : (
        <button onClick={toggleVisibility}>New blog</button>
      )}

      {Array.isArray(blogs) &&
        blogs.sort((a, b) => b.likes - a.likes).map(blog => <Blog key={blog.id} blog={blog} />)}
    </>
  )
}

export default Blogs
