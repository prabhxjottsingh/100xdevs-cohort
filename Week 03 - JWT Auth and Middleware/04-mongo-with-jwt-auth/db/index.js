const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const MONGODB_CONN_STRING_URL = process.env.MONGODB_URL;
mongoose.connect(MONGODB_CONN_STRING_URL).then(() => {
  console.log('DB connected successfully');
});

// Define schemas
const AdminSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  purchasedCourse: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
    },
  ],
});

const CourseSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
});

const Admin = mongoose.model('Admin', AdminSchema);
const User = mongoose.model('User', UserSchema);
const Course = mongoose.model('Course', CourseSchema);

module.exports = {
  Admin,
  User,
  Course,
};
