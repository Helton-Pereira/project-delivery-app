const idElement = 'customer_orders__element-order-id-';
const statusElement = 'customer_orders__element-delivery-status-';
const dateElement = 'customer_orders__element-order-date-';
const priceElement = 'customer_orders__element-card-price-';

const allOrders = [
  {
    id: 1,
    totalPrice: '23.80',
    saleDate: '08/04/21',
    status: 'PENDENTE',
  },
  {
    id: 2,
    totalPrice: '14.20',
    saleDate: '08/04/21',
    status: 'PREPARANDO',
  },
  {
    id: 3,
    totalPrice: '28.46',
    saleDate: '07/04/21',
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
