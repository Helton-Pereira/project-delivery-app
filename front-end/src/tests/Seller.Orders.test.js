import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';
import loginMocks from './helpers/mocks/login.mocks';
import ordersMocks from './helpers/mocks/seller.orders.mocks';
import api from '../services/requests';

describe('Test the Seller Orders page', () => {
  let history;

  beforeEach(() => {
    history = renderWithRouter(<App />).history;

    localStorage.setItem('user', JSON.stringify(loginMocks.loginData));

    history.push('/seller/orders');
  });

  afterEach(() => jest.clearAllMocks());

  const ID_PAD_START = 4;

  test('Checks seller orders cards', async () => {
    jest.spyOn(api, 'requestData').mockImplementation(() => ordersMocks.allOrders);

    await waitFor(() => {});

    ordersMocks.allOrders.forEach((order) => {
      const idEl = screen.getByTestId(`${ordersMocks.idElement}${order.id}`);
      const statusEl = screen.getByTestId(`${ordersMocks.statusElement}${order.id}`);
      const dateEl = screen.getByTestId(`${ordersMocks.dateElement}${order.id}`);
      const priceEl = screen.getByTestId(`${ordersMocks.priceElement}${order.id}`);
      const addressElement = screen.getByTestId(`${ordersMocks.addressElement}${order.id}`);

      expect(idEl).toBeInTheDocument();
      expect(idEl.innerHTML).toBe(order.id.toString().padStart(ID_PAD_START, '0'));

      expect(statusEl).toBeInTheDocument();
      expect(statusEl.innerHTML).toBe(order.status);

      expect(dateEl).toBeInTheDocument();
      expect(dateEl.innerHTML).toBe(order.saleDate);

      expect(priceEl).toBeInTheDocument();
      expect(priceEl.innerHTML).toBe(`R$ ${order.totalPrice.replace(/\./, ',')}`);

      expect(addressElement).toBeInTheDocument();
      expect(addressElement.innerHTML).toBe(`${order.deliveryAddress}, ${order.deliveryNumber}`);
    });
  });

  test(
    'Checks user redirection to seller order details page after clicking order card',
    async () => {
      jest.spyOn(api, 'requestData')
        .mockImplementationOnce(() => ordersMocks.allOrders) // Mocks api response that returns all orders (Orders page)
        .mockImplementationOnce(() => (ordersMocks.orderDetails)); // Mocks api response that returns order details (Order details page)

      await waitFor(() => {});

      const orderCard = screen.getByTestId(`${ordersMocks.idElement}${ordersMocks.orderDetails.id}`);

      userEvent.click(orderCard);

      await waitFor(() => {
        expect(history.location.pathname).toBe(`/seller/orders/${ordersMocks.orderDetails.id}`);
      });
    },
  );
});
