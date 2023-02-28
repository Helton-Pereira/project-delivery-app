const Jwt = require('jsonwebtoken');
const fs = require('fs');

const secret = fs.readFileSync('./jwt.evaluation.key');

function generateToken(data) {
  const token = Jwt.sign(data, secret, { algorithm: 'HS256', expiresIn: '12h' });
  return token;
}

function verifyToken(token) {
  const tokenDecoded = Jwt.verify(token, secret);
  return tokenDecoded;
}

export default { generateToken, verifyToken };