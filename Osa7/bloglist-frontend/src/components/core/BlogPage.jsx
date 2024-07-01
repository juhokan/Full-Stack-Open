import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { commentBlog, getBlog } from '../../requests'
import { UserContext, NotificationContext } from '../../context'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useContext } from 'react'
import { deleteBlog, likeBlog } from '../../requests'
import { ERROR, SUCCESS } from '../../model'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  TextField
} from '@mui/material'


const BlogPage = () => {
  const id = useParams().id
  const [comment, setComment] = useState('')
  const { user } = useContext(UserContext)
  const { messageDispatch, setType } = useContext(NotificationContext)
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const { data: blog } = useQuery({
    queryKey: ['blog'],
    queryFn:() => getBlog(id),
    retry: 1
  })

  useEffect(() => {
    if (blog) {
      console.log(blog.comments)
    }
  }, [blog])

  const { mutate: likeMutate } = useMutation({
    mutationFn: likeBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
      setType(SUCCESS)
      messageDispatch({
        type: 'MESSAGE',
        payload: `blog ${blog.title} liked`,
      })
      setTimeout(() => {
        messageDispatch({
          type: 'RESET',
        })
        setType('')
      }, 3000)
    },
    onError: () => {
      setType(ERROR)
      messageDispatch({
        type: 'MESSAGE',
        payload: 'error adding anecdote',
      })
      setTimeout(() => {
        messageDispatch({
          type: 'RESET',
        })
        setType('')
      }, 3000)
    },
  })

  const { mutate: deleteMutate } = useMutation({
    mutationFn: deleteBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
      setType(SUCCESS)
      messageDispatch({
        type: 'MESSAGE',
        payload: `blog ${blog.title} deleted`,
      })
      setTimeout(() => {
        messageDispatch({
          type: 'RESET',
        })
        setType('')
      }, 3000)
    },
    onError: () => {
      setType(ERROR)
      messageDispatch({
        type: 'MESSAGE',
        payload: 'error deleting blog',
      })
      setTimeout(() => {
        messageDispatch({
          type: 'RESET',
        })
        setType('')
      }, 3000)
    },
  })

  const { mutate: commentMutate } = useMutation({
    mutationFn: commentBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
      setType(SUCCESS)
      messageDispatch({
        type: 'MESSAGE',
        payload: `comment ${comment} added`,
      })
      setTimeout(() => {
        messageDispatch({
          type: 'RESET',
        })
        setType('')
        setComment('')
      }, 3000)
    },
    onError: () => {
      setType(ERROR)
      messageDispatch({
        type: 'MESSAGE',
        payload: 'error commenting blog',
      })
      setTimeout(() => {
        messageDispatch({
          type: 'RESET',
        })
        setType('')
      }, 3000)
    },
  })

  const onLike = (e) => {
    e.preventDefault()
    const content = {
      user: blog.user,
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
    }
    if (content) {
      likeMutate({ newBlog: content, token: user.token, id: blog.id })
    }
  }

  const onDelete = (e) => {
    e.preventDefault()
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      deleteMutate({ token: user.token, id: blog.id })
      navigate('/')
    }
  }

  const onComment = (e) => {
    e.preventDefault()
    commentMutate({ comment: { comments: comment }, id: blog.id })
  }

  return (
    <>
      {blog &&
      <div>
        <h2>{blog.title}</h2>
        <div>
          Link:
          <a href={blog.url}>{blog.url}</a>
        </div>
        <div>
          Likes: {blog.likes}
          <button onClick={onLike}>Like</button>
        </div>
        <div>Added by {blog.user.name}</div>
        {blog.user.username === user.username && <button onClick={onDelete}>remove</button>}
        <h3>Comments</h3>
        <form onSubmit={onComment}>
          <div>
            <TextField
              type="text"
              value={comment}
              name="title"
              onChange={({ target }) => setComment(target.value)}
            />
            <button type="submit">Comment</button>
          </div>
        </form>
        <TableContainer component={Paper}>
          <Table>
            <TableBody>
              {blog.comments.map((c, index) =>
                <TableRow key={index}>
                  <TableCell>
                    <div>
                      <div>{c}</div>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>}
    </>
  )
}

export default BlogPage