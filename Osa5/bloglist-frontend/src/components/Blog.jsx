import React, { useState } from 'react'
import blogService from '../services/blogs'
import { BlogContext, UserContext } from '../context'
import { useContext } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog }) => {
  const [isVisible, setIsVisible] = useState(false)
  const { user } = useContext(UserContext)
  const { setBlogs } = useContext(BlogContext)

  const fetchBlogs = async () => {
    try {
      const blogsData = await blogService.getAll()
      setBlogs(blogsData)
    } catch (error) {
      console.error(error)
    }
  }

  const toggleVisibility = () => {
    setIsVisible(!isVisible)
  }

  const handleDelete = async () => {
    if (window.confirm(`Remove blog ${blog.name}?`)) {
      const response = await blogService.deleteBlog(blog.id, user.token)
      console.log(response)
      fetchBlogs()
    }
  }

  const handleLike = async () => {
    const response = await blogService.putBlog(
      blog.id,
      blog.user,
      blog.likes + 1,
      blog.title,
      blog.author,
      blog.url,
      user.token
    )
    console.log(response)
    fetchBlogs()
  }

  const HiddenBlog = () => {
    return (
      <div>
        {blog.title} {blog.author}
        <button onClick={toggleVisibility}>show</button>
      </div>
    )
  }

  const VisibleBlog = () => {
    return (
      <div>
        <div>{blog.title} {blog.author} <button onClick={toggleVisibility}>hide</button></div>
        <div>{blog.url}</div>
        <div>
          Likes: {blog.likes}
          <button onClick={handleLike} >Like</button>
        </div>
        <div>{blog.user.name}</div>
        <button onClick={handleDelete}>remove</button>
      </div>
    )
  }

  return (
    <div className="blog">
      {isVisible ? <VisibleBlog /> : <HiddenBlog />}
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired
}

export default Blog
