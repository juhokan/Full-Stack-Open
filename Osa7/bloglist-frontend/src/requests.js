import axios from 'axios'

const url = 'http://localhost:3003/api/blogs'

export const getBlogs = () =>
  axios.get(url).then(res => res.data)

export const createBlog = ({ newBlog, token }) =>
  axios.post(url, newBlog, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }).then(res => res.data)