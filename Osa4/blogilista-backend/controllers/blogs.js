const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
require('dotenv').config()


blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})


blogsRouter.post('/', async (request, response, next) => {
  try {
    const body = request.body;

    const token = request.token;
    const decodedToken = jwt.verify(token, process.env.SECRET);

    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token invalid' });
    }

    const user = await User.findById(decodedToken.id);

    if (!user) {
      return response.status(401).json({ error: 'user not found' });
    }

    if (!body.title || !body.url) {
      return response.status(400).json({ error: 'title or url is missing' });
    }

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes || 0,
      user: user._id
    });

    const savedBlog = await blog.save();

    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();

    response.status(201).json(savedBlog);
  } catch (error) {
    next(error);
  }
});


blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET);

    if (!request.token || !decodedToken.id) {
      return response.status(401).json({
        error: 'token missing or invalid'
      });
    }

    const blog = await Blog.findById(request.params.id);

    if (!blog) {
      return response.status(404).json({ error: 'Blog not found' });
    }

    if (blog.user.toString() === decodedToken.id.toString()) {
      await blog.deleteOne();
      response.status(204).end();
    } else {
      response.status(401).json({ error: 'token invalid' });
    }
  } catch (error) {
    next(error);
  }
});


blogsRouter.put('/:id', async (request, response, next) => {
  const body = request.body

  const updatedBlog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  try {
    const blog = await Blog.findByIdAndUpdate(request.params.id, updatedBlog)
    response.json(blog)
  } catch (exception) {
    next(exception)
  }
})

module.exports = blogsRouter