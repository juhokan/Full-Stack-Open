const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const assert = require('node:assert')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const { createUserAndGetToken } = require('./test_helper');

const api = supertest(app)

const initialBlogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  }
]

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[2])
  await blogObject.save()
})

beforeEach(async () => {
  await User.deleteMany({});
  const result = await createUserAndGetToken();
  token = result.token;
});


test('there are three blogs', async () => {
  const response = await api.get('/api/blogs')

  assert.strictEqual(response.body.length, initialBlogs.length)
})

test('identifying field is id', async () => {
  const response = await api.get('/api/blogs');
  
  response.body.forEach(blog => {
    assert.strictEqual(typeof blog.id, 'string');
    assert.notStrictEqual(blog._id, blog.id); // Ensure _id is not present in the response
  });
});


test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .expect(200)
    .expect('Content-Type', /application\/json/);
});


test('POST /api/blogs works', async () => {
  const before = await Blog.find({});

  const newBlog = {
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.html",
    likes: 10,
  };

  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const after = await Blog.find({});
  assert.strictEqual(before.length + 1, after.length);

  const titles = after.map(blog => blog.title);
  assert(titles.includes('First class tests'));
});

test('POST /api/blogs returns 401 without token', async () => {
  const before = await Blog.find({});

  const newBlog = {
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.html",
    likes: 10,
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(401)
});

test('POST /api/blogs check empty title returns 400 Bad request', async () => {
  const newBlog = {
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.html",
  };

  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(newBlog)
    .expect(400);
});

test('POST /api/blogs check empty url returns 400 Bad request', async () => {
  const newBlog = {
    title: "First class tests",
    author: "Robert C. Martin",
  };

  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(newBlog)
    .expect(400);
});

test('DELETE /api/blogs/:id deletes a blog post', async () => {
  const blogsAtStart = await Blog.find({});
  const blogToDelete = blogsAtStart[0];

  await api
    .delete(`/api/blogs/${blogToDelete._id}`)
    .set('Authorization', `Bearer ${token}`)
    .expect(204);

  const blogsAtEnd = await Blog.find({});
  assert.strictEqual(blogsAtEnd.length, blogsAtStart.length - 1);

  const titles = blogsAtEnd.map(blog => blog.title);
  assert(!titles.includes(blogToDelete.title));
});

test('PUT /api/blogs/:id updates a blog post', async () => {
  const blogsAtStart = await Blog.find({});
  const blogToUpdate = blogsAtStart[0];

  const updatedBlog = {
    title: "Updated Title",
    author: "Updated Author",
    url: "http://updated-url.com",
    likes: 20
  };

  await api
    .put(`/api/blogs/${blogToUpdate._id}`)
    .send(updatedBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/);

  const blogsAtEnd = await Blog.find({});
  const updatedBlogInDb = blogsAtEnd.find(blog => blog._id.toString() === blogToUpdate._id.toString());

  assert.strictEqual(updatedBlogInDb.title, updatedBlog.title);
  assert.strictEqual(updatedBlogInDb.author, updatedBlog.author);
  assert.strictEqual(updatedBlogInDb.url, updatedBlog.url);
  assert.strictEqual(updatedBlogInDb.likes, updatedBlog.likes);
});

after(async () => {
  await mongoose.connection.close();
});