const { Router } = require('express');
const adminMiddleware = require('../middleware/admin');
const { Admin, Course } = require('../db');
const router = Router();

// Admin Routes
router.post('/signup', async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;

    const existingUser = await Admin.findOne({ username });

    if (existingUser) {
      console.log(`${username} this is the ${existingUser}`);
      res.status(409).json({
        msg: 'User with same name already exists',
      });
      return;
    }

    await Admin.create({
      username: username,
      password: password,
    });

    res.json({
      msg: 'Admin created successfully',
    });
  } catch (error) {
    console.error('Error while signing up the admin', error);
    res.status(500).json({
      msg: 'Internal Server error',
    });
  }
});

router.post('/courses', adminMiddleware, async (req, res) => {
  const { title, description, price, imageLink } = req.body;

  const existingSameNamedCourse = await Course.findOne({ title });
  if (existingSameNamedCourse) {
    return res.status(409).json({
      msg: 'Course with same name already exists',
    });
  }

  const createdCourse = await Course.create({ title, description, price, imageLink });
  console.log(`this is the created course: ${createdCourse}`);
  res.status(201).json({
    msg: `New course added successfully: ${createdCourse._id}`,
  });
});

router.get('/courses', adminMiddleware, async (req, res) => {
  try {
    const allCourses = await Course.find();
    console.log('All Courses List: ', allCourses);
    res.status(200).json({
      courses: allCourses,
    });
  } catch (error) {
    console.error('Error while fetching all courses: ', error);
    res.status(500).json({
      msg: 'Internal server error',
    });
  }
});

module.exports = router;
