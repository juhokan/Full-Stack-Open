import axios from 'axios'

const blogsUrl = 'http://localhost:3003/api/blogs'
const usersUrl = 'http://localhost:3003/api/users'
const loginUrl = 'http://localhost:3003/api/login'

export const getBlogs = () =>
  axios.get(blogsUrl).then(res => res.data)

export const getUsers = () =>
  axios.get(usersUrl).then(res => res.data)

export const getUser = (id) =>
  axios.get(`${usersUrl}/${id}`).then(res => res.data )

export const createBlog = ({ newBlog, token }) =>
  axios.post(blogsUrl, newBlog, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }).then(res => res.data)

export const likeBlog = ({ newBlog, token, id }) =>
  axios.put(`${blogsUrl}/${id}`, newBlog, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }).then(res => res.data)

export const deleteBlog = ({ token, id }) => {
  console.log(token)
  axios.delete(`${blogsUrl}/${id}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }).then(res => res.data)
}

export const login = (credentials) =>
  axios.post(loginUrl, credentials).then(res => res.data)