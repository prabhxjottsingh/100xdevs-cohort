const { Router } = require('express');
const adminMiddleware = require('../middleware/admin');
const { Admin } = require('../db');
const generateWebToken = require('../utils');
const router = Router();

// Admin Routes
router.post('/signup', async (req, res) => {
  try {
    const { username, password } = req.body;
    const existingUser = await Admin.findOne({ username });
    if (existingUser) {
      console.log(`Admin with name ${username} already exists`);
      return res.status(409).json({ msg: 'Admin with the same name already exists' });
    }
    await Admin.create({
      username,
      password,
    });
    res.status(200).json({ msg: 'Admin created successfully' });
  } catch (error) {
    console.error('Error while signing up for admin: ', error);
    res.status(500).json({ msg: 'Error while admin signing up' });
  }
});

router.post('/signin', async (req, res) => {
  try {
    const { username, password } = req.body;
    const userMatched = await Admin.findOne({ username, password });
    if (userMatched) {
      const token = generateWebToken({ username });
      return res.status(200).json({ msg: 'Admin with the same name already exists', token: token });
    }
    res.status(200).json({ msg: 'Either the username or password is wrong' });
  } catch (error) {
    console.error('Error while signing up for admin: ', error);
    res.status(500).json({ msg: 'Error while admin signing up' });
  }
});

router.post('/courses', adminMiddleware, (req, res) => {
  // Implement course creation logic
});

router.get('/courses', adminMiddleware, (req, res) => {
  // Implement fetching all courses logic
});

module.exports = router;
