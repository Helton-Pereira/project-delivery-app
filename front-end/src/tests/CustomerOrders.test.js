import React from 'react';
import { screen, waitFor } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';
import loginMocks from './helpers/mocks/login.mocks';
import ordersMocks from './helpers/mocks/orders.mocks';
import api from '../services/requests';

describe('Test the Customer Orders page', () => {
  let history;

  beforeEach(() => {
    jest.spyOn(api, 'requestData').mockImplementation(() => ordersMocks.allOrders);

    history = renderWithRouter(<App />).history;

    localStorage.setItem('user', JSON.stringify(loginMocks.loginData));
    // localStorage.setItem('cart', []);

    history.push('/customer/orders');
  });

  afterEach(() => jest.clearAllMocks());

  const ID_PAD_START = 4;

  test('Checks orders cards', async () => {
    await waitFor(() => {});

    ordersMocks.allOrders.forEach((order, index) => {
      const idEl = screen.getByTestId(`${ordersMocks.idElement}${index + 1}`);
      const statusEl = screen.getByTestId(`${ordersMocks.statusElement}${index + 1}`);
      const dateEl = screen.getByTestId(`${ordersMocks.dateElement}${index + 1}`);
      const priceEl = screen.getByTestId(`${ordersMocks.priceElement}${index + 1}`);

      expect(idEl).toBeInTheDocument();
      expect(idEl.innerHTML).toBe(order.id.toString().padStart(ID_PAD_START, '0'));

      expect(statusEl).toBeInTheDocument();
      expect(statusEl.innerHTML).toBe(order.status);

      expect(dateEl).toBeInTheDocument();
      expect(dateEl.innerHTML).toBe(order.saleDate);

      expect(priceEl).toBeInTheDocument();
      expect(priceEl.innerHTML).toBe(`R$  ${order.totalPrice.replace(/\./, ',')}`);
    });
  });

  test(
    'Checks user redirection to order details page after clicking order card',
    async () => {
      await waitFor(() => {});

      const orderCard = screen.getByTestId(`${ordersMocks.idElement}1`);

      userEvent.click(orderCard);

      await waitFor(() => {
        expect(history.location.pathname).toBe('/customer/orders/1');
      });
    },
  );
});
