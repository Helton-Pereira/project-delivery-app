const formElements = {
  sellers: 'customer_checkout__select-seller',
  address: 'customer_checkout__input-address',
  addressNumber: 'customer_checkout__input-address-number',
  submitButton: 'customer_checkout__button-submit-order',
};

const tableElements = {
  number: 'customer_checkout__element-order-table-item-number-',
  name: 'customer_checkout__element-order-table-name-',
  quantity: 'customer_checkout__element-order-table-quantity-',
  price: 'customer_checkout__element-order-table-unit-price-',
  subtotal: 'customer_checkout__element-order-table-sub-total-',
  rmButton: 'customer_checkout__element-order-table-remove-',
  total: 'customer_checkout__element-order-total-price',
};

const entries = {
  address: 'Rua Um',
  addressNumber: '2',
};

const sellers = [
  {
    id: 2,
    name: 'Fulana Pereira',
    email: 'fulana@deliveryapp.com',
    role: 'seller',
  },
  {
    id: 4,
    name: 'Batman',
    email: 'batman@deliveryapp.com',
    role: 'seller',
  },
];

const cart = [
  {
    id: 1,
    name: 'Skol Lata 250ml',
    price: 2.2,
    quantity: 1,
  },
  {
    id: 2,
    name: 'Heineken 600ml',
    price: 7.5,
    quantity: 1,
  },
];

const orderDetails = {
  id: 1,
  userId: 3,
  sellerId: 2,
  totalPrice: '9.70',
  deliveryAddress: entries.address,
  deliveryNumber: entries.addressNumber,
  saleDate: '2023-03-08T13:17:29.000Z',
  status: 'Pendente',
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
  formElements,
  tableElements,
  entries,
  sellers,
  cart,
  orderDetails,
};
