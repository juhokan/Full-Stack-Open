import React from 'react'
import { AnecdoteContext } from '../context'
import { useNavigate } from 'react-router-dom'
import { useField } from '../hooks/index'

const CreateNew = () => {
  const { setAnecdotes } = React.useContext(AnecdoteContext)
  const navigate = useNavigate()

  const content = useField('text')
  const author = useField('text')
  const info = useField('text')

  const addNew = (anecdote) => {
    const id = Math.round(Math.random() * 10000)
    const newAnecdote = {...anecdote, id: id}
    setAnecdotes(newAnecdote)
    navigate('/')
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(content.value)
    addNew({
      info: info.value,
      content: content.value,
      author: author.value,
      votes: 0
    })
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content:
          <input {...content} /> 
        </div>
        <div>
          author:
          <input {...author} />
        </div>
        <div>
          info:
          <input {...info} />
        </div>
        <button>create</button>
      </form>
    </div>
  )
}

export default CreateNew
