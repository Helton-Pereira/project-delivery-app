const newSale = {
  "name": "Cliente Zé Birita",
  "seller": "Fulana Pereira",
  "totalPrice": 17.20,
  "deliveryAddress": "Rua Um",
  "deliveryNumber": "2",
  "productsId": [1, 2],
  "quantities": [1, 2]
}

const newSaleRes = {
  dataValues: {
    id: 1
  }
}

const customerUser = {
  dataValues: {
    id: 3,
    name: 'Cliente Zé Birita',
    email: 'zebirita@email.com',
    password: '1c37466c159755ce1fa181bd247cb925',
    role: 'customer',
  },
}

const sellerUser = {
  dataValues: {
    id: 2,
    name: 'Fulana Pereira',
    email: 'fulana@deliveryapp.com',
    password: '3c28d2b0881bf46457a853e0b07531c6',
    role: 'seller',
  },
}

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY3NDUwODQ0MCwiZXhwIjoxNjc0NTMwMDQwfQ.1snol1cy5G6-3E3PZ7m9NPwhy4kQOcrwWiz677V_n98"

const tokenPayload = { email: 'zebirita@email.com', iat: 1674516494, exp: 1674538094 }


module.exports = { newSale, newSaleRes, customerUser, sellerUser, token, tokenPayload };