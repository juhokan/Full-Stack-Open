import React, { useState, useEffect, useContext } from 'react'
import Blog from './Blog'
import { BlogContext } from '../../context'
import { useQuery } from '@tanstack/react-query'
import CreateBlog from './CreateBlog'
import { getBlogs } from '../../requests'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from '@mui/material'

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

      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {Array.isArray(blogs) && blogs.sort((a, b) => b.likes - a.likes).map(blog =>
              <TableRow key={blog.id}>
                <TableCell>
                  <Blog blog={blog} />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default Blogs
