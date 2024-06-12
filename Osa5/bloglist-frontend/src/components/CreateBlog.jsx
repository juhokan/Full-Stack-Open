import React, { useState } from 'react';
import blogService from '../services/blogs';
import { useContext } from 'react';
import { UserContext } from '../context';

const CreateBlog = ({ setBlogs }) => {
  const { user } = useContext(UserContext);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    await blogService.postNewBlog(title, author, url, user.token);
    const updatedBlogs = await blogService.getAll();
    setBlogs(updatedBlogs);
    setTitle('');
    setAuthor('');
    setUrl('');
  };

  return (
    <>
      <h2>Create New</h2>
      <form onSubmit={handleSubmit}>
        <div>
          Title
          <input
            type="text"
            value={title}
            name="title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          Author
          <input
            type="text"
            value={author}
            name="author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          URL
          <input
            type="text"
            value={url}
            name="url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">Create</button>
      </form>
    </>
  );
};

export default CreateBlog;
