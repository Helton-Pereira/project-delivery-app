import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';
import productsMocks from './helpers/mocks/customer.products.mocks';
import loginMocks from './helpers/mocks/login.mocks';
import api from '../services/requests';

describe('Test the Customer Products page', () => {
  beforeEach(() => {
    jest.spyOn(api, 'requestData').mockImplementation(() => productsMocks.allProducts);

    const { history } = renderWithRouter(<App />);

    localStorage.setItem('user', JSON.stringify(loginMocks.loginData));
    localStorage.setItem('cart', []);

    history.push('/customer/products');
  });

  afterEach(() => jest.clearAllMocks());

  test('Checks products cards', async () => {
    await waitFor(() => {});

    productsMocks.allProducts.forEach((product, index) => {
      const priceEl = screen.getByTestId(`${productsMocks.priceElement}${index + 1}`);
      const imageEl = screen.getByTestId(`${productsMocks.imageElement}${index + 1}`);
      const titleEl = screen.getByTestId(`${productsMocks.titleElement}${index + 1}`);
      const removeBtn = screen.getByTestId(`${productsMocks.removeButton}${index + 1}`);
      const addBtn = screen.getByTestId(`${productsMocks.addButton}${index + 1}`);
      const qtyInput = screen.getByTestId(`${productsMocks.quantityInput}${index + 1}`);

      expect(priceEl).toBeInTheDocument();
      expect(priceEl.innerHTML).toBe(`R$  ${product.price.replace(/\./, ',')}`);

      expect(imageEl).toBeInTheDocument();
      expect(imageEl.src).toBe(product.urlImage);

      expect(titleEl).toBeInTheDocument();
      expect(titleEl.innerHTML).toContain(product.name);

      expect(removeBtn).toBeInTheDocument();
      expect(addBtn).toBeInTheDocument();
      expect(qtyInput).toBeInTheDocument();
    });
  });

  test('Checks add item button and local storage performance', async () => {
    await waitFor(() => {});

    let storage;
    const addBtn1 = screen.getByTestId(`${productsMocks.addButton}1`);
    const qtyInput1 = screen.getByTestId(`${productsMocks.quantityInput}1`);
    const addBtn2 = screen.getByTestId(`${productsMocks.addButton}2`);
    const qtyInput2 = screen.getByTestId(`${productsMocks.quantityInput}2`);

    userEvent.click(addBtn1);
    storage = JSON.parse(localStorage.getItem('cart'));

    expect(storage).toHaveLength(1);
    expect(storage[0].quantity).toBe(1);
    expect(qtyInput1).toHaveValue(1);

    userEvent.click(addBtn1);
    storage = JSON.parse(localStorage.getItem('cart'));

    expect(storage).toHaveLength(1);
    expect(storage[0].quantity).toBe(2);
    expect(qtyInput1).toHaveValue(2);

    userEvent.click(addBtn2);
    storage = JSON.parse(localStorage.getItem('cart'));

    expect(storage).toHaveLength(2);
    expect(storage[0].quantity).toBe(2);
    expect(storage[1].quantity).toBe(1);
    expect(qtyInput2).toHaveValue(1);
  });

  test('Checks remove item button and local storage performance', async () => {
    const initialValues = [
      { id: 1, name: 'Skol Lata 250ml', price: 2.2, quantity: 2 },
      { id: 2, name: 'Heineken 600ml', price: 7.5, quantity: 1 },
    ];

    localStorage.setItem('cart', JSON.stringify(initialValues));

    await waitFor(() => {});

    let storage;
    const rmBtn1 = screen.getByTestId(`${productsMocks.removeButton}1`);
    const qtyInput1 = screen.getByTestId(`${productsMocks.quantityInput}1`);
    const rmBtn2 = screen.getByTestId(`${productsMocks.removeButton}2`);
    const qtyInput2 = screen.getByTestId(`${productsMocks.quantityInput}2`);

    userEvent.click(rmBtn1);
    storage = JSON.parse(localStorage.getItem('cart'));

    expect(storage).toHaveLength(2);
    expect(storage[0].id).toBe(1);
    expect(storage[0].quantity).toBe(1);
    expect(qtyInput1).toHaveValue(1);

    userEvent.click(rmBtn1);
    storage = JSON.parse(localStorage.getItem('cart'));

    expect(storage).toHaveLength(1);
    expect(storage[0].id).not.toBe(1);
    expect(storage[0].quantity).toBe(1);
    expect(qtyInput1).toHaveValue(0);

    userEvent.click(rmBtn2);
    storage = JSON.parse(localStorage.getItem('cart'));

    expect(storage).toHaveLength(0);
    expect(qtyInput2).toHaveValue(0);
  });

  test('Checks quantity manual input and local storage performance', async () => {
    await waitFor(() => {});

    let storage;
    const qtyInput1 = screen.getByTestId(`${productsMocks.quantityInput}1`);
    const qtyInput2 = screen.getByTestId(`${productsMocks.quantityInput}2`);

    userEvent.type(qtyInput1, '2');
    storage = JSON.parse(localStorage.getItem('cart'));

    expect(storage).toHaveLength(1);
    expect(storage[0].quantity).toBe(2);
    expect(qtyInput1).toHaveValue(2);

    userEvent.clear(qtyInput1);
    userEvent.type(qtyInput1, '1');
    storage = JSON.parse(localStorage.getItem('cart'));

    expect(storage).toHaveLength(1);
    expect(storage[0].quantity).toBe(1);
    expect(qtyInput1).toHaveValue(1);

    userEvent.type(qtyInput2, '2');
    storage = JSON.parse(localStorage.getItem('cart'));

    expect(storage).toHaveLength(2);
    expect(storage[1].quantity).toBe(2);
    expect(qtyInput2).toHaveValue(2);

    userEvent.clear(qtyInput1);
    storage = JSON.parse(localStorage.getItem('cart'));

    expect(storage).toHaveLength(1);
    expect(storage[0].quantity).toBe(2);
    expect(qtyInput1).toHaveValue(0);
  });
});
