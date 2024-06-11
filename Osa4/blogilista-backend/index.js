const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config()

const password = process.env.PASSWORD
const dbName = process.env.DB_NAME

const url = `mongodb+srv://juhokan:${password}@puhelinluettelo-db.mutnh94.mongodb.net/${dbName}?retryWrites=true&w=majority&appName=puhelinluettelo-db`;

const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
});

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method);
  console.log('Path:  ', request.path);
  console.log('Body:  ', request.body);
  console.log('---');
  next();
};

const Blog = mongoose.model('Blog', blogSchema);

app.use(express.static('dist'));
app.use(express.json());
app.use(requestLogger);
app.use(cors());

mongoose.set('strictQuery', false);


mongoose.connect(url)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
  });

app.get('/api/blogs', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs);
    });
});

app.post('/api/blogs', (request, response) => {
  const blog = new Blog(request.body);

  blog
    .save()
    .then(result => {
      response.status(201).json(result);
    });
});

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
