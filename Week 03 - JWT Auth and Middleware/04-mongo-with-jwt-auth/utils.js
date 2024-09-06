const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();
const SECRET_KEY = process.env.JWT_SECRET_KEY;

const generateWebToken = data => {
  const token = jwt.sign(data, SECRET_KEY);
  console.log(`JWT token for the data: ${JSON.stringify(data)} is: ${token}`);
  return token;
};

const verifyWebToken = token => {
  const authorised = jwt.verify(token, SECRET_KEY);
  return authorised;
};

module.exports = { generateWebToken, verifyWebToken };
