import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = async () => {
  try {
    const response = await axios.get(baseUrl);
    return response.data;
  } catch (error) {
    console.error('Error fetching blogs:', error);
    throw error;
  }
};

const postNewBlog = async (title, author, url, token) => {
  try {
    const data = {
      title: title,
      author: author,
      url: url
    };

    const response = await axios.post(baseUrl, data, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    console.log(JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};


export default { getAll, postNewBlog }