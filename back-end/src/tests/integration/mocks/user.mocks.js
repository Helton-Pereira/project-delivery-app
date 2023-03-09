const md5 = require('md5');

const unhashedPassword = "$#zebirita#$";
const hashedPassword = md5(unhashedPassword);

const userRes = {
  id: 3,
  name: 'Cliente Zé Birita',
  email: 'zebirita@email.com',
  role: 'customer'
}

const sellerUserRes = {
  id: 2,
  name: 'Fulana Pereira',
  email: 'fulana@deliveryapp.com',
  role: 'seller'
}

const user = {
  dataValues: {
    ...userRes,
    password: hashedPassword,
  },
}

const sellerUser = {
  dataValues: {
    ...sellerUserRes,
    password: hashedPassword,
  },
}

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY3NDUwODQ0MCwiZXhwIjoxNjc0NTMwMDQwfQ.1snol1cy5G6-3E3PZ7m9NPwhy4kQOcrwWiz677V_n98"

module.exports = { unhashedPassword, userRes, user, sellerUser, token };