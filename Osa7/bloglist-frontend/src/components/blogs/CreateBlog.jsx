import React, { useState, useContext } from 'react'
import { UserContext, NotificationContext, BlogContext } from '../../context'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ERROR, SUCCESS } from '../../model'
import { createBlog } from '../../requests'

const CreateBlog = () => {
  const { user } = useContext(UserContext)
  const { blogs, setBlogs } = useContext(BlogContext)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const { messageDispatch, setType } = useContext(NotificationContext)
  const queryClient = useQueryClient()

  const { mutate } = useMutation({
    mutationFn: createBlog,
    onSuccess: (newBlog) => {
      setBlogs(...blogs, newBlog)
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
      setType(SUCCESS)
      messageDispatch({
        type: 'MESSAGE',
        payload: 'new blog created',
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

  const onCreate = (event) => {
    event.preventDefault()
    const content = { title: title, author:author, url: url }
    if (content) {
      resetForm()
      mutate({ newBlog: content, token: user.token })
    }
  }

  const resetForm = () => {
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  const displayMessage = (message) => {
    messageDispatch({
      type: 'MESSAGE',
      payload: message
    })
    setTimeout(() => {
      messageDispatch({
        type: 'RESET'
      })
      setType('')
    }, 2000)
  }

  return (
    <>
      <h2>Create New</h2>
      <form onSubmit={onCreate}>
        <div>
          Title
          <input
            type="text"
            value={title}
            name="title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          Author
          <input
            type="text"
            value={author}
            name="author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          URL
          <input
            type="text"
            value={url}
            name="url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">Create</button>
      </form>
    </>
  )
}

export default CreateBlog
