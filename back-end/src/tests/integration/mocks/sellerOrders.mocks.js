const allOrders = [
  {
    "id": 1,
    "userId": 3,
    "sellerId": 2,
    "totalPrice": "12.75",
    "deliveryAddress": "Rua Um",
    "deliveryNumber": "2",
    "saleDate": "2023-03-07T00:02:28.000Z",
    "status": "Pendente"
  },
  {
    "id": 2,
    "userId": 3,
    "sellerId": 2,
    "totalPrice": "50.25",
    "deliveryAddress": "Rua Um",
    "deliveryNumber": "2",
    "saleDate": "2023-03-08T00:03:33.000Z",
    "status": "Pendente"
  },
];

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY3NDUwODQ0MCwiZXhwIjoxNjc0NTMwMDQwfQ.1snol1cy5G6-3E3PZ7m9NPwhy4kQOcrwWiz677V_n98"

const tokenPayload = { email: 'fulana@deliveryapp.com', role: 'seller', iat: 1674516494, exp: 1674538094 }

module.exports = { allOrders, token, tokenPayload };