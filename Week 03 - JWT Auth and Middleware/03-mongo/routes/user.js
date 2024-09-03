const { Router } = require('express');
const router = Router();
const userMiddleware = require('../middleware/user');
const { User, Course } = require('../db');

// User Routes
router.post('/signup', async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      console.log('This is the existinguser: ', existingUser);
      return res.status(409).json({ msg: 'User with the same name already exists' });
    }
    await User.create({ username, password });
    res.status(201).json({
      msg: 'User created successfully',
    });
  } catch (error) {
    console.error('Error while signing up the user: ', error);
    res.status(500).json({
      msg: 'Internal server error',
    });
  }
});

router.get('/courses', userMiddleware, async (req, res) => {
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

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
  try {
    const { username } = req.headers;
    const { courseId } = req.params;
    const user = await User.findOne({ username });
    if (user.purchasedCourses.includes(courseId)) {
      return res.status(400).json({ msg: 'Course already purchased' });
    }
    user.purchasedCourses.push(courseId);
    await user.save();
    res.status(200).json({ msg: 'Course purchased successfully' });
  } catch (error) {
    console.error('Error while purchasing course:', error);
    res.status(500).json({ msg: 'Internal Server Error' });
  }
});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
  try {
    const { username } = req.headers;
    const userData = await User.findOne({ username });
    const purchasedCoursesIds = userData.purchasedCourses;
    console.log('PurchasedCourseIds: ', purchasedCoursesIds);
    const purchasedCourses = await Promise.all(purchasedCoursesIds.map(courseId => Course.findOne({ _id: courseId })));

    res.status(200).json({
      msg: purchasedCourses,
    });
  } catch (error) {
    console.error('Error while fetching user purchased courses: ', error);
    res.status(500).json({ msg: 'Internal Server Error' });
  }
});

module.exports = router;
