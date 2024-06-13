import React, { useState } from "react";
import blogService from '../services/blogs'
import { UserContext } from "../context";
import { useContext } from "react";

const Blog = ({ blog }) => {
  const [isVisible, setIsVisible] = useState(false);
  const { user } = useContext(UserContext)

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const handleLike = async () => {
    const response = await blogService.putBlog(
      blog.id, 
      blog.user, 
      blog.likes + 1, 
      blog.title, 
      blog.author, 
      blog.url, 
      user.token
    )
    console.log(response)
  }

  const HiddenBlog = () => {
    return (
      <div>
        {blog.title} {blog.author}
        <button onClick={toggleVisibility}>show</button>
      </div>
    );
  };

  const VisibleBlog = () => {
    return (
      <div>
        <div>{blog.title} {blog.author}</div>
        <div>{blog.url}</div>
        <div>
          Likes: {blog.likes}
          <button onClick={handleLike} >Like</button>
        </div>
        <div>{blog.user.name}</div>
        <button onClick={toggleVisibility}>hide</button>
      </div>
    );
  };

  return (
    <div className="blog">
      {isVisible ? <VisibleBlog /> : <HiddenBlog />}
    </div>
  );
};

export default Blog;
