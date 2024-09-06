// Middleware for handling auth

const { verifyWebToken } = require('../utils');

function adminMiddleware(req, res, next) {
  const token = req.headers.authorization.split(' ')[1];

  if (verifyWebToken(token)) next();
  else res.status(403).json({ msg: 'you are not authroised' });
}

module.exports = adminMiddleware;
