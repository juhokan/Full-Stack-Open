import React, { useState, useEffect, useContext } from 'react';
import blogService from '../services/blogs';
import Blog from './Blog';
import { UserContext } from '../context';
import CreateBlog from './CreateBlog';

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const { user, setUser } = useContext(UserContext);
  const [username, setUsername] = useState('');

  const fetchData = async () => {
    try {
      const blogsData = await blogService.getAll();
      setBlogs(blogsData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    try {
      setUsername(user.name);
    } catch (error) {
      console.error(error);
    }
    fetchData();
  }, [user]);

  const handleLogout = (event) => {
    event.preventDefault();
    setUser(null);
  };

  return (
    <>
      <h2>Blogs</h2>
      <p>
        {username} logged in
        <button onClick={handleLogout}>Log Out</button>
      </p>
      <CreateBlog setBlogs={setBlogs} />
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </>
  );
};

export default Blogs;
