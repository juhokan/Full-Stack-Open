import React from 'react'

export const AnecdoteContext = React.createContext ({
  anecdotes: null,
  setAnecdotes: _ => {} // eslint-disable-line no-unused-vars
})