import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = async () => {
  try {
    const response = await axios.get(baseUrl)
    return response.data
  } catch (error) {
    console.error(error)
  }
}

const postNewBlog = async (title, author, url, token) => {
  try {
    const data = {
      title: title,
      author: author,
      url: url
    }

    const response = await axios.post(baseUrl, data, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })

    console.log(JSON.stringify(response.data))
    return response
  } catch (error) {
    return error.response
  }
}

const putBlog = async (id, user, likes, title, author, url, token) => {
  const putUrl = `${baseUrl}/${id}`

  try {
    const data = {
      user: user,
      likes: likes,
      title: title,
      author: author,
      url: url
    }

    const response = await axios.put(putUrl, data, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })

    console.log(JSON.stringify(response.data))
    return response
  } catch (error) {
    return error.response
  }
}

const deleteBlog = async (id, token) => {
  const url = `${baseUrl}/${id}`

  try {
    const response = await axios.delete(url, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })

    console.log(JSON.stringify(response.data))
    return response
  } catch (error) {
    return error.response
  }
}


export default { getAll, postNewBlog, putBlog, deleteBlog }