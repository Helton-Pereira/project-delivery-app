import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';
import loginMocks from './helpers/mocks/login.mocks';
import orderMocks from './helpers/mocks/customerOrderDetails.mocks';
import api from '../services/requests';
import conversions from '../utils/conversions';

describe('Test the Customer Order Details page', () => {
  let history;

  beforeEach(() => {
    jest.spyOn(api, 'requestData').mockImplementation(() => orderMocks.order);

    history = renderWithRouter(<App />).history;

    localStorage.setItem('user', JSON.stringify(loginMocks.loginData));

    history.push(`/customer/orders/${orderMocks.order.id}`);
  });

  afterEach(() => jest.clearAllMocks());

  test('Checks if the header elements exist', async () => {
    await waitFor(() => {});

    const idEl = screen.getByTestId(orderMocks.headerElements.id);
    const sellerEl = screen.getByTestId(orderMocks.headerElements.seller);
    const saleDateEl = screen.getByTestId(orderMocks.headerElements.saleDate);
    const statusEl = screen.getByTestId(orderMocks.headerElements.status);
    const button = screen.getByTestId(orderMocks.headerElements.button);

    expect(idEl).toBeInTheDocument();
    expect(sellerEl).toBeInTheDocument();
    expect(saleDateEl).toBeInTheDocument();
    expect(statusEl).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  test('Checks if the table elements exist', async () => {
    await waitFor(() => {});

    const totalSingleEl = screen.getByTestId(orderMocks.tableElements.total);
    expect(totalSingleEl).toBeInTheDocument();

    orderMocks.order.products.forEach((product, index) => {
      const numberEl = screen.getByTestId(`${orderMocks.tableElements.number}${index}`);
      const nameEl = screen.getByTestId(`${orderMocks.tableElements.name}${index}`);
      const quantityEl = screen.getByTestId(`${orderMocks.tableElements.quantity}${index}`);
      const priceEl = screen.getByTestId(`${orderMocks.tableElements.price}${index}`);
      const subtotalEl = screen.getByTestId(`${orderMocks.tableElements.subtotal}${index}`);

      const { SaleProduct: { quantity } } = product;

      expect(numberEl).toBeInTheDocument();
      expect(numberEl.innerHTML).toBe((index + 1).toString());

      expect(nameEl).toBeInTheDocument();
      expect(nameEl.innerHTML).toBe(product.name);

      expect(quantityEl).toBeInTheDocument();
      expect(quantityEl.innerHTML).toBe(quantity.toString());

      expect(priceEl).toBeInTheDocument();
      expect(priceEl.innerHTML).toBe(conversions.convertPrice(Number(product.price)));

      expect(subtotalEl).toBeInTheDocument();
      expect(subtotalEl.innerHTML).toBe(conversions.convertPrice(product.price * quantity));
    });
  });

  test('Checks if delivery button is disable if status is not "Em Trânsito"', async () => {
    await waitFor(() => {});

    const statusEl = screen.getByTestId(orderMocks.headerElements.status);
    const button = screen.getByTestId(orderMocks.headerElements.button);

    expect(statusEl.innerHTML).not.toBe('Em Trânsito');
    expect(button).toBeDisabled();
  });

  test('Checks if delivery button is not disable if status is "Em Trânsito"', async () => {
    jest.spyOn(api, 'requestData').mockImplementation(() => orderMocks.inTransitOrder);
    jest.spyOn(api, 'updateOrderStatus');

    let statusEl;
    let button;

    await waitFor(() => {});

    statusEl = screen.getByTestId(orderMocks.headerElements.status);
    button = screen.getByTestId(orderMocks.headerElements.button);

    expect(statusEl.innerHTML).toBe('Em Trânsito');
    expect(button).not.toBeDisabled();
    userEvent.click(button);

    await waitFor(() => {
      statusEl = screen.getByTestId(orderMocks.headerElements.status);
      button = screen.getByTestId(orderMocks.headerElements.button);
      expect(statusEl.innerHTML).toBe('Entregue');
      expect(button).toBeDisabled();
    });
  });
});
