import React from 'react'
import { AnecdoteContext } from '../context'
import { useNavigate } from 'react-router-dom'
import { useField } from '../hooks/index'

const CreateNew = () => {
  const { setAnecdotes } = React.useContext(AnecdoteContext)
  const navigate = useNavigate()

  const { reset: resetContent, ...content } = useField("text");
  const { reset: resetAuthor, ...author } = useField("text");
  const { reset: resetInfo, ...info } = useField("text");


  const addNew = (anecdote) => {
    const id = Math.round(Math.random() * 10000)
    const newAnecdote = {...anecdote, id: id}
    setAnecdotes(newAnecdote)
    navigate('/')
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()
    addNew({
      info: info.value,
      content: content.value,
      author: author.value,
      votes: 0
    })
  }

  const handleReset = (e) => {
    e.preventDefault()
    resetContent();
    resetAuthor();
    resetInfo();
  };

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
        <button onClick={handleReset}>reset</button>
      </form>
    </div>
  )
}

export default CreateNew
