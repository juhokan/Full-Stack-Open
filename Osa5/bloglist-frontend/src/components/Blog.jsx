import React, { useState } from "react";

const Blog = ({ blog }) => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

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
        <div>{blog.title}</div>
        <div>{blog.author}</div>
        <div>{blog.url}</div>
        <div>
          Likes: {blog.likes}
          <button>Like</button>
        </div>
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
