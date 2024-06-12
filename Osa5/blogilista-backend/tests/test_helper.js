const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const generateToken = (user) => {
  const userForToken = {
    username: user.username,
    id: user._id,
  };
  return jwt.sign(userForToken, process.env.SECRET, { expiresIn: '1h' });
};

const createUserAndGetToken = async () => {
  const passwordHash = await bcrypt.hash('password', 10);
  const user = new User({
    username: 'testuser',
    name: 'Test User',
    passwordHash,
  });
  await user.save();

  const token = generateToken(user);
  return { user, token };
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map(u => u.toJSON());
};

module.exports = {
  usersInDb,
  createUserAndGetToken,
};