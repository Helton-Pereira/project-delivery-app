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
    email: 'fulana@deliveryapp.com',
    id: 2,
    name: 'Fulana Pereira',
    role: 'seller',
  },
  {
    email: 'batman@deliveryapp.com',
    id: 4,
    name: 'Batman',
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

export default {
  formElements,
  tableElements,
  entries,
  sellers,
  cart,
};
