import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';
import loginMocks from './helpers/mocks/login.mocks';
import orderMocks from './helpers/mocks/sellerOrderDetails.mocks';
import api from '../services/requests';
import conversions from '../utils/conversions';

describe('Test the Seller Order Details page', () => {
  let history;

  beforeEach(() => {
    jest.spyOn(api, 'requestData').mockImplementation(() => orderMocks.order);

    history = renderWithRouter(<App />).history;

    localStorage.setItem('user', JSON.stringify(loginMocks.sellerLoginData));

    history.push(`/seller/orders/${orderMocks.order.id}`);
  });

  afterEach(() => jest.clearAllMocks());

  test('Checks if the header elements exist', async () => {
    await waitFor(() => {});  

    const idEl = screen.getByTestId(orderMocks.headerElements.id);
    const saleDateEl = screen.getByTestId(orderMocks.headerElements.saleDate);
    const statusEl = screen.getByTestId(orderMocks.headerElements.status);
    const preparingBtn = screen.getByTestId(orderMocks.headerElements.preparingBtn);
    const dispatchBtn = screen.getByTestId(orderMocks.headerElements.dispatchBtn);

    expect(idEl).toBeInTheDocument();
    expect(saleDateEl).toBeInTheDocument();
    expect(statusEl).toBeInTheDocument();
    expect(preparingBtn).toBeInTheDocument();
    expect(dispatchBtn).toBeInTheDocument();
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

  test('Checks if only preparing button is not disabled if status is "Pendente"', async () => {
    jest.spyOn(api, 'updateOrderStatus');

    let statusEl;
    let preparingBtn;
    let dispatchBtn;

    await waitFor(() => {});

    statusEl = screen.getByTestId(orderMocks.headerElements.status);
    preparingBtn = screen.getByTestId(orderMocks.headerElements.preparingBtn);
    dispatchBtn = screen.getByTestId(orderMocks.headerElements.dispatchBtn);

    expect(statusEl.innerHTML).toBe('Pendente');
    expect(preparingBtn).not.toBeDisabled();
    expect(dispatchBtn).toBeDisabled();

    userEvent.click(preparingBtn);

    await waitFor(() => {
      statusEl = screen.getByTestId(orderMocks.headerElements.status);
      preparingBtn = screen.getByTestId(orderMocks.headerElements.preparingBtn);
      dispatchBtn = screen.getByTestId(orderMocks.headerElements.dispatchBtn);

      expect(statusEl.innerHTML).toBe('Preparando');
      expect(preparingBtn).toBeDisabled();
      expect(dispatchBtn).not.toBeDisabled();
    });
  });

  test('Checks if only dispatch button is not disabled if status is "Preparando"', async () => {
    jest.spyOn(api, 'requestData').mockImplementation(() => orderMocks.inPreparationOrder);
    jest.spyOn(api, 'updateOrderStatus');

    let statusEl;
    let preparingBtn;
    let dispatchBtn;

    await waitFor(() => {});

    statusEl = screen.getByTestId(orderMocks.headerElements.status);
    preparingBtn = screen.getByTestId(orderMocks.headerElements.preparingBtn);
    dispatchBtn = screen.getByTestId(orderMocks.headerElements.dispatchBtn);

    expect(statusEl.innerHTML).toBe('Preparando');
    expect(preparingBtn).toBeDisabled();
    expect(dispatchBtn).not.toBeDisabled();

    userEvent.click(dispatchBtn);

    await waitFor(() => {
      statusEl = screen.getByTestId(orderMocks.headerElements.status);
      preparingBtn = screen.getByTestId(orderMocks.headerElements.preparingBtn);
      dispatchBtn = screen.getByTestId(orderMocks.headerElements.dispatchBtn);

      expect(statusEl.innerHTML).toBe('Em Trânsito');
      expect(preparingBtn).toBeDisabled();
      expect(dispatchBtn).toBeDisabled();
    });
  });

  test('Checks if both buttons are disabled if status is "Em Trânsito"', async () => {
    jest.spyOn(api, 'requestData').mockImplementation(() => orderMocks.inTransitOrder);
    jest.spyOn(api, 'updateOrderStatus');

    await waitFor(() => {});

    const statusEl = screen.getByTestId(orderMocks.headerElements.status);
    const preparingBtn = screen.getByTestId(orderMocks.headerElements.preparingBtn);
    const dispatchBtn = screen.getByTestId(orderMocks.headerElements.dispatchBtn);

    expect(statusEl.innerHTML).toBe('Em Trânsito');
    expect(preparingBtn).toBeDisabled();
    expect(dispatchBtn).toBeDisabled();
  });
});
