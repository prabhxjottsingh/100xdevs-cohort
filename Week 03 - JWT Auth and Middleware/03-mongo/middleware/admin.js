const { Admin } = require('../db/index.js');

// Middleware for handling auth
async function adminMiddleware(req, res, next) {
  // Implement admin auth logic
  const username = req.headers.username;
  const password = req.headers.password;
  const userExists = await Admin.findOne({
    username: username,
    password: password,
  });
  if (!userExists) {
    return res.status(403).json({
      msg: 'Unauthorised',
    });
  }
  next();
  // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
}

module.exports = adminMiddleware;
