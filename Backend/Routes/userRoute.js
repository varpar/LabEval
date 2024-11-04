const express = require('express');
const User = require('../models/user')
const router = express.Router();


// Signup route
router.post('/signup', async (req, res) => {
    try {
        const existingUser = await User.findOne({ username: req.body.username });
        if (existingUser) {
          return res.status(400).json({ message: 'Username already taken. Please choose a different one.' });
        }
    
    
        const newUser = new User({
          username: req.body.username,
          password: req.body.password,
          email: req.body.email
        });
    
        const savedUser = await newUser.save();
        res.status(201).json({ message: 'User registered successfully', user: savedUser });
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
});


// Login route
router.post('/login', async (req, res) => {
    const user = await User.findOne({ username: req.body.username });
    try{

    
    if (!user) {
      return res.status(400).json({ message: 'Invalid username or password.' });
    }

    // Compare the hashed password with the provided password
    const isMatch = (req.body.password == user.password)
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid username or password.' });
    }


    // If login is successful
    res.status(200).json({ message: 'Login successful', user });
  } catch(err) {
    res.status(500).json({ message: err.message });
  }
});


module.exports = router;


