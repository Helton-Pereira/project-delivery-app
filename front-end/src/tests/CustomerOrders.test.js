import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';
import loginMocks from './helpers/mocks/login.mocks';
import ordersMocks from './helpers/mocks/orders.mocks';
import api from '../services/requests';
import conversions from '../utils/conversions'

describe('Test the Customer Orders page', () => {
  let history;

  beforeEach(() => {
    jest.spyOn(api, 'requestData').mockImplementation(() => ordersMocks.allOrders);

    history = renderWithRouter(<App />).history;

    localStorage.setItem('user', JSON.stringify(loginMocks.loginData));

    history.push('/customer/orders');
  });

  afterEach(() => jest.clearAllMocks());

  const ID_PAD_START = 4;

  test('Checks orders cards', async () => {
    await waitFor(() => {});

    ordersMocks.allOrders.forEach((order) => {
      const idEl = screen.getByTestId(`${ordersMocks.idElement}${order.id}`);
      const statusEl = screen.getByTestId(`${ordersMocks.statusElement}${order.id}`);
      const dateEl = screen.getByTestId(`${ordersMocks.dateElement}${order.id}`);
      const priceEl = screen.getByTestId(`${ordersMocks.priceElement}${order.id}`);

      expect(idEl).toBeInTheDocument();
      expect(idEl.innerHTML).toBe(order.id.toString().padStart(ID_PAD_START, '0'));

      expect(statusEl).toBeInTheDocument();
      expect(statusEl.innerHTML).toBe(order.status);

      expect(dateEl).toBeInTheDocument();
      expect(dateEl.innerHTML).toBe(conversions.convertDate(order.saleDate));

      expect(priceEl).toBeInTheDocument();
      expect(priceEl.innerHTML).toContain(`R$ ${order.totalPrice.replace(/\./, ',')}`);
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
