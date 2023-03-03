const md5 = require('md5');

const unhashedPassword = "$#zebirita#$";
const hashedPassword = md5(unhashedPassword);

const userRes = {
  name: 'Cliente Zé Birita',
  email: 'zebirita@email.com',
  role: 'customer'
}

const user = {
  dataValues: {
    ...userRes,
    id: 3,
    password: hashedPassword,
  },
}

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY3NDUwODQ0MCwiZXhwIjoxNjc0NTMwMDQwfQ.1snol1cy5G6-3E3PZ7m9NPwhy4kQOcrwWiz677V_n98"

module.exports = { unhashedPassword, userRes, user, token };