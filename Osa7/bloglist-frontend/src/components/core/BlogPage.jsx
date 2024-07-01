import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getBlog } from '../../requests'
import { UserContext, NotificationContext } from '../../context'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useContext } from 'react'
import { deleteBlog, likeBlog } from '../../requests'
import { ERROR, SUCCESS } from '../../model'


const BlogPage = () => {
  const id = useParams().id
  const { user } = useContext(UserContext)
  const { messageDispatch, setType } = useContext(NotificationContext)
  const queryClient = useQueryClient()
  const navigate = useNavigate()


  const { data: blog } = useQuery({
    queryKey: ['blog'],
    queryFn:() => getBlog(id),
    retry: 1
  })

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

  return (
    <>
      {blog &&
      <div>
        <h2>{blog.title}</h2>
        <a href={blog.url}>{blog.url}</a>
        <div>
          Likes: {blog.likes}
          <button onClick={onLike}>Like</button>
        </div>
        <div>added by {blog.user.name}</div>
        {blog.user.username === user.username && <button onClick={onDelete}>remove</button>}
      </div>}
    </>
  )
}

export default BlogPage