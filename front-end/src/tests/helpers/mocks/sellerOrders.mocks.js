const idElement = 'seller_orders__element-order-id-';
const statusElement = 'seller_orders__element-delivery-status-';
const dateElement = 'seller_orders__element-order-date-';
const priceElement = 'seller_orders__element-card-price-';
const addressElement = 'seller_orders__element-card-address-';

const allOrders = [
  {
    id: 1,
    totalPrice: '9.70',
    saleDate: '08/04/21',
    status: 'Entregue',
    deliveryAddress: 'Rua Irmãos Monteiro, Bairo Pedras',
    deliveryNumber: '851',
  },
  {
    id: 2,
    totalPrice: '14.20',
    saleDate: '08/04/21',
    status: 'Pendente',
    deliveryAddress: 'Rua Vila Bela,  Bairro Gurupi',
    deliveryNumber: '670',

  },
  {
    id: 3,
    totalPrice: '28.46',
    saleDate: '07/04/21',
    status: 'Pendente',
    deliveryAddress: 'Rua Sessenta e Dois, Bairro Maranguape II',
    deliveryNumber: '533',

  },
];

const orderDetails = {
  ...allOrders[0],
  userId: 3,
  sellerId: 2,
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
  addressElement,
  allOrders,
  orderDetails,
};
