const { User } = require('../db');
const { use } = require('../routes/admin');

async function userMiddleware(req, res, next) {
  // Implement user auth logic
  const username = req.headers.username;
  const password = req.headers.password;
  const userExists = await User.findOne({
    username: username,
    password: password,
  });
  if (userExists === null) {
    return res.status(403).json({
      msg: "Users doesn't exists",
    });
  }
  next();
  // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
}

module.exports = userMiddleware;
