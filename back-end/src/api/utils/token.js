const Jwt = require('jsonwebtoken');
const fs = require('fs');

const secret = fs.readFileSync('jwt.evaluation.key');

function generateToken(data) {
  const jwtConfig = {
    expiresIn: '12h',
    algorithm: 'HS256',
  };

  const token = Jwt.sign({ data }, secret, jwtConfig);
  return token;
}

function verifyToken(token) {
  const tokenDecoded = Jwt.verify(token, secret);
  return tokenDecoded;
}

module.exports = { generateToken, verifyToken };