const idElement = 'seller_orders__element-order-id-';
const statusElement = 'seller_orders__element-delivery-status-';
const dateElement = 'seller_orders__element-order-date-';
const priceElement = 'seller_orders__element-card-price-';
const addressElement = 'seller_orders__element-card-address-';

const allOrders = [
  {
    id: 1,
    totalPrice: '23.80',
    saleDate: '08/04/21',
    status: 'PENDENTE',
    deliveryAddress: 'Rua Irmãos Monteiro, Bairo Pedras',
    deliveryNumber: '851',
  },
  {
    id: 2,
    totalPrice: '14.20',
    saleDate: '08/04/21',
    status: 'PREPARANDO',
    deliveryAddress: 'Rua Vila Bela,  Bairro Gurupi',
    deliveryNumber: '670',

  },
  {
    id: 3,
    totalPrice: '28.46',
    saleDate: '07/04/21',
    status: 'ENTREGUE',
    deliveryAddress: 'Rua Sessenta e Dois, Bairro Maranguape II',
    deliveryNumber: '533',

  },
];

export default {
  idElement,
  statusElement,
  dateElement,
  priceElement,
  addressElement,
  allOrders,
};
