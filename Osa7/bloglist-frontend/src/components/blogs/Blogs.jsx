import React, { useState, useEffect, useContext } from 'react'
import Blog from './Blog'
import { BlogContext, UserContext } from '../../context'
import { useQuery } from '@tanstack/react-query'
import CreateBlog from './CreateBlog'
import { getBlogs } from '../../requests'

const Blogs = () => {
  const { blogs, setBlogs } = useContext(BlogContext)
  const [isVisible, setIsVisible] = useState(false)

  const toggleVisibility = () => {
    setIsVisible(!isVisible)
  }

  const { data, isLoading, isError } = useQuery({
    queryKey: ['blogs'],
    queryFn: getBlogs,
    retry: 1
  })

  useEffect(() => {
    if (data) {
      setBlogs(data)
    }
  }, [data, setBlogs])

  if (isLoading) {
    return <div>loading data...</div>
  }

  if (isError) {
    return <div>blog service is not available due to problems in the server</div>
  }

  return (
    <>
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
