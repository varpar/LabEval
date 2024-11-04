const express = require('express');
const router = express.Router();
const Signup = require('../Models/login');
const bcrypt = require('bcryptjs');

// POST route to handle user signup (registration)
router.post('/', async (req, res) => {
  try {
    // Check if the username already exists
    const existingUser = await Signup.findOne({ username: req.body.username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already taken. Please choose a different one.' });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // Create a new user with the hashed password
    const newUser = new Signup({
      username: req.body.username,
      password: hashedPassword,
    });

    // Save the new user to the database
    const savedUser = await newUser.save();
    res.status(201).json({ message: 'User registered successfully', user: savedUser });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
