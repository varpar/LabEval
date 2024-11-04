const express = require('express');
const router = express.Router();
const Login = require('../Models/login');
const bcrypt = require('bcryptjs');

// POST route to handle user login
router.post('/', async (req, res) => {
  try {
    // Check if the username exists
    const user = await Login.findOne({ username: req.body.username });
    if (!user) {
      return res.status(400).json({ message: 'Invalid username or password.' });
    }

    // Compare the hashed password with the provided password
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid username or password.' });
    }

    // If login is successful
    res.status(200).json({ message: 'Login successful', user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
