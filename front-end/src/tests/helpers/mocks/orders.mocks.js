const idElement = 'customer_orders__element-order-id-';
const statusElement = 'customer_orders__element-delivery-status-';
const dateElement = 'customer_orders__element-order-date-';
const priceElement = 'customer_orders__element-card-price-';

const allOrders = [
  {
    id: 1,
    totalPrice: '23.80',
    saleDate: '2023-03-06T21:00:00.000Z',
    status: 'PENDENTE',
  },
  {
    id: 2,
    totalPrice: '14.20',
    saleDate: '2023-03-07T10:30:00.000Z',
    status: 'PREPARANDO',
  },
  {
    id: 3,
    totalPrice: '28.46',
    saleDate: '2023-03-08T15:20:00.000Z',
    status: 'ENTREGUE',
  },
];

export default {
  idElement,
  statusElement,
  dateElement,
  priceElement,
  allOrders,
};
