const md5 = require('md5');

const unhashedPassword = "newuser123";
const hashedPassword = md5(unhashedPassword);
const role =  'customer';

const newUser = {
  name: "unusedWonderfulName",
  email: "newuser@email.com",
  password: hashedPassword,
}

const newUserCreated = {
  dataValues: {
    ...newUser,
    id: 4,
    role,
  },
}

const newUserRes = {
  name: newUser.name,
  role,
}

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY3NDUwODQ0MCwiZXhwIjoxNjc0NTMwMDQwfQ.1snol1cy5G6-3E3PZ7m9NPwhy4kQOcrwWiz677V_n98"

const alreadyRegisteredUser = {
  dataValues: {
    id: 3,
    name: 'Cliente Zé Birita',
    email: 'zebirita@email.com',
    password: '1c37466c159755ce1fa181bd247cb925',
    role: 'customer',
  },
}

module.exports = { newUser, unhashedPassword, newUserCreated, newUserRes, token, alreadyRegisteredUser };