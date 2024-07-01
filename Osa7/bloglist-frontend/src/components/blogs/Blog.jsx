import React, { useState } from 'react'
import { UserContext, NotificationContext, BlogContext } from '../../context'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useContext } from 'react'
import PropTypes from 'prop-types'
import { deleteBlog, likeBlog } from '../../requests'
import { ERROR, SUCCESS } from '../../model'

const Blog = ({ blog }) => {
  const [isVisible, setIsVisible] = useState(false)
  const { user } = useContext(UserContext)
  const { messageDispatch, setType } = useContext(NotificationContext)
  const queryClient = useQueryClient()

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
    }
  }

  const toggleVisibility = () => {
    setIsVisible(!isVisible)
  }

  const HiddenBlog = () => {
    return (
      <div>
        <a href={`/${blog.id}`}>{blog.title}</a> {blog.author}
        <button onClick={toggleVisibility}>show</button>
      </div>
    )
  }

  const VisibleBlog = () => {
    return (
      <div>
        <div>
          <a href={`/${blog.id}`}>{blog.title}</a> {blog.author} <button onClick={toggleVisibility}>hide</button>
        </div>
        <div>{blog.url}</div>
        <div>
          Likes: {blog.likes}
          <button onClick={onLike}>Like</button>
        </div>
        <div>{blog.user.name}</div>
        {blog.user.username === user.username && <button onClick={onDelete}>remove</button>}
      </div>
    )
  }

  return <div>{isVisible ? <VisibleBlog /> : <HiddenBlog />}</div>
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
}

export default Blog
