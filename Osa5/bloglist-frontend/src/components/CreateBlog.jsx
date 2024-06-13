import React, { useState, useContext } from 'react'
import blogService from '../services/blogs'
import { BlogContext, UserContext, NotificationContext } from '../context'

const CreateBlog = () => {
  const { setBlogs } = useContext(BlogContext)
  const { user } = useContext(UserContext)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const { setMessage, setType } = useContext(NotificationContext)

  const handleSubmit = async (event) => {
    event.preventDefault()
    const response = await blogService.postNewBlog(title, author, url, user.token)
    if (response.status !== 400) {
      const updatedBlogs = await blogService.getAll()
      setBlogs(updatedBlogs)
      displayMessage(`A new blog ${response.data.title} by ${response.data.author} created!`, 'success')
    }
    else {
      displayMessage('Error creating blog!', 'error')
    }

    console.log(response)

    resetForm()


  }
  const resetForm = () => {
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  const displayMessage = (message, type) => {
    setMessage(message)
    setType(type)
    setTimeout(() => {
      setMessage(null)
      setType(null)
    }, 2000)
  }

  return (
    <>
      <h2>Create New</h2>
      <form onSubmit={handleSubmit}>
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
