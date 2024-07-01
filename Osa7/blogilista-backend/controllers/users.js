const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({}).populate('blogs', { url: 1, title: 1, author: 1 })
  response.json(users)
})

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body;

  if (!username || username.length < 3) {
    return response.status(400).json({ error: 'username must be at least 3 characters long' });
  }

  if (!password || password.length < 3) {
    return response.status(400).json({ error: 'password must be at least 3 characters long' });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    passwordHash,
  });

  try {
    const savedUser = await user.save();
    response.status(201).json(savedUser);
  } catch (error) {
    // Catch MongoDB's own status code for non-unique value
    if (error.code === 11000) {
      return response.status(400).json({ error: 'username must be unique' });
    }
    response.status(500).json({ error: 'something went wrong' });
  }
});

usersRouter.get('/:id', async (request, response) => {
  const { id } = request.params;

  try {
    const user = await User.findById(id).populate('blogs', { url: 1, title: 1, author: 1 });
    if (user) {
      response.json(user);
    } else {
      response.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    response.status(500).json({ error: 'something went wrong' });
  }
});

module.exports = usersRouter