import React, { useState, useEffect, useContext } from 'react';
import blogService from '../services/blogs';
import Blog from './Blog';
import { UserContext } from '../context';
import CreateBlog from './CreateBlog';
import Notification from './Notification';

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const { user, setUser } = useContext(UserContext);
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState(null);
  const [type, setType] = useState(null);

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
      <Notification message={message} type={type}/>
      <p>
        {username} logged in
        <button onClick={handleLogout}>Log Out</button>
      </p>
      <CreateBlog setBlogs={setBlogs} setMessage={setMessage} setType={setType}/>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </>
  );
};

export default Blogs;