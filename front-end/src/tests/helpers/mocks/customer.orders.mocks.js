const idElement = 'customer_orders__element-order-id-';
const statusElement = 'customer_orders__element-delivery-status-';
const dateElement = 'customer_orders__element-order-date-';
const priceElement = 'customer_orders__element-card-price-';

const allOrders = [
  {
    id: 1,
    totalPrice: '9.70',
    saleDate: '2023-03-06T21:00:00.000Z',
    status: 'Entregue',
  },
  {
    id: 2,
    totalPrice: '14.20',
    saleDate: '2023-03-07T10:30:00.000Z',
    status: 'Pendente',
  },
  {
    id: 3,
    totalPrice: '28.46',
    saleDate: '2023-03-08T15:20:00.000Z',
    status: 'Pendente',
  },
];

const orderDetails = {
  ...allOrders[0],
  userId: 3,
  sellerId: 2,
  deliveryAddress: 'Rua Um',
  deliveryNumber: '2',
  seller: {
    id: 2,
    name: 'Fulana Pereira',
  },
  products: [
    {
      id: 1,
      name: 'Skol Lata 250ml',
      price: '2.20',
      urlImage: 'http://localhost:3001/images/skol_lata_350ml.jpg',
      SaleProduct: {
        quantity: 1,
      },
    },
    {
      id: 2,
      name: 'Heineken 600ml',
      price: '7.50',
      urlImage: 'http://localhost:3001/images/heineken_600ml.jpg',
      SaleProduct: {
        quantity: 1,
      },
    },
  ],
};

export default {
  idElement,
  statusElement,
  dateElement,
  priceElement,
  allOrders,
  orderDetails,
};
