import React, { useState, useEffect, useContext } from 'react'
import blogService from '../services/blogs';
import Blog from './Blog';
import { UserContext } from '../context';

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const { user, setUser } = useContext(UserContext);
  const [username, setUsername] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const blogsData = await blogService.getAll();
        setBlogs(blogsData);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };

    try {
      setUsername(user.name)
    } catch (error) {
      console.error('not valid JSON')
    }

    fetchData();
  }, [user]);

  const handleLogout = (event) => {
    event.preventDefault();
    setUser()
  }


  return (
    <>
      <h2>blogs</h2>
      <p>{username} logged in
        <button onClick={handleLogout}>log out</button>
      </p>
      {blogs.map(blog => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </>
  )
}

export default Blogs