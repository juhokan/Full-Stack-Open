import React from 'react'

export const UserContext = React.createContext({
  user: null,
  setUser: _ => {},
})

export const BlogContext = React.createContext({
  blog: null,
  setBlogs: _ => {},
})

export const NotificationContext = React.createContext({
  message: null,
  setMessage: _ => {},
  type: null,
  setType: _ => {},
})
