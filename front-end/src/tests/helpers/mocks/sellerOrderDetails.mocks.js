const id = 1;

const order = {
  id,
  totalPrice: '9.70',
  saleDate: '2023-03-06T21:00:00.000Z',
  status: 'Pendente',
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

const inPreparationOrder = {
  ...order,
  status: 'Preparando',
};

const inTransitOrder = {
  ...order,
  status: 'Em Trânsito',
};

const headerElements = {
  id: 'seller_order_details__element-order-details-label-order-id',
  saleDate: 'seller_order_details__element-order-details-label-order-date',
  status: 'seller_order_details__element-order-details-label-delivery-status',
  preparingBtn: 'seller_order_details__button-preparing-check',
  dispatchBtn: 'seller_order_details__button-dispatch-check',
};

const tableElements = {
  number: 'seller_order_details__element-order-table-item-number-',
  name: 'seller_order_details__element-order-table-name-',
  quantity: 'seller_order_details__element-order-table-quantity-',
  price: 'seller_order_details__element-order-table-unit-price-',
  subtotal: 'seller_order_details__element-order-table-sub-total-',
  total: 'seller_order_details__element-order-total-price',
};

export default {
  order,
  inPreparationOrder,
  inTransitOrder,
  headerElements,
  tableElements,
};
