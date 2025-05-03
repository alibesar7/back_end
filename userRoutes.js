const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('./users');

const Router = express.Router();

// GET all users (excluding _id and passwordHash)
Router.get('/', async (req, res) => {
  const userList = await User.find().select('-_id name email phone');
  if (!userList) {
    return res.status(500).json({ success: false });
  }
  res.send(userList);
});

// POST new user (generic endpoint)
Router.post('/', async (req, res) => {
  const existingUser = await User.findOne({ email: req.body.email });
  if (existingUser) {
    return res.status(400).send('Email already exists');
  }

  let user = new User({
    ...req.body,
    passwordHash: bcrypt.hashSync(req.body.password, 10),
  });

  user = await user.save();
  if (!user) return res.status(500).send('User cannot be created');
  res.send(user);
});

// REGISTER user (with unique email check)
Router.post('/register', async (req, res) => {
  const existingUser = await User.findOne({ email: req.body.email });
  if (existingUser) {
    return res.status(400).send('Email already exists');
  }

  let user = new User({
    ...req.body,
    passwordHash: bcrypt.hashSync(req.body.password, 10),
  });

  user = await user.save();
  if (!user) return res.status(500).send('User cannot be created');
  res.send(user);
});

// GET specific user by ID
Router.get('/:id', async (req, res) => {
  const user = await User.findById(req.params.id).select('name email phone isAdmin');
  if (!user) {
    return res.status(404).json({ success: false });
  }
  res.send(user);
});

// LOGIN route
Router.post('/login', async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).send('User not found');
  }

  const passwordMatch = bcrypt.compareSync(req.body.password, user.passwordHash);
  if (!passwordMatch) {
    return res.status(400).send('Password is wrong');
  }

  res.status(200).send({
    user: user.email,
    phone: user.phone,
  });
});

// GET user count
Router.get('/get/count', async (req, res) => {
  const userCount = await User.countDocuments();
  res.send({ userCount });
});

// DELETE user by ID
Router.delete('/:ID', (req, res) => {
  User.findByIdAndDelete(req.params.ID)
    .then(user => {
      if (user) {
        return res.status(200).json({ success: true, message: "Deleted successfully" });
      } else {
        return res.status(404).json({ success: false, message: "User not found" });
      }
    })
    .catch(err => {
      return res.status(400).json({ success: false, error: err });
    });
});

module.exports = Router;
