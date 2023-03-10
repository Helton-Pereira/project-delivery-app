import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import api from '../services/requests';
import renderWithRouter from './helpers/renderWithRouter';
import ordersMocks from './helpers/mocks/seller.orders.mocks';
import navBarMocks from './helpers/mocks/seller.navbar.mocks';
import loginMocks from './helpers/mocks/login.mocks';

describe('Test the Seller NavBar component', () => {
  let history;

  beforeEach(() => {
    jest.spyOn(api, 'requestData').mockImplementation(() => ordersMocks.allOrders);

    history = renderWithRouter(<App />).history;

    localStorage.setItem('user', JSON
      .stringify(loginMocks.sellerLoginData));

    history.push('/seller/orders');
  });

  afterEach(() => jest.clearAllMocks());

  test('Checks if the elements exist', async () => {
    await waitFor(() => {});

    const ordersLink = screen.getByTestId(navBarMocks.ordersLink);
    const userNameElement = screen.getByTestId(navBarMocks.userNameElement);
    const checkoutButton = screen.getByTestId(navBarMocks.checkoutButton);

    expect(ordersLink).toBeInTheDocument();
    expect(userNameElement).toBeInTheDocument();
    expect(checkoutButton).toBeInTheDocument();
  });

  test(
    'Checks user redirection to orders page after clicking orders link',
    async () => {
      await waitFor(() => {});

      const ordersLink = screen.getByTestId(navBarMocks.ordersLink);

      userEvent.click(ordersLink);

      await waitFor(() => {
        expect(history.location.pathname).toBe('/seller/orders');
      });
    },
  );

  test('Checks if the username matches local storage data', async () => {
    await waitFor(() => {});

    const userNameElement = screen.getByTestId(navBarMocks.userNameElement);

    expect(userNameElement.innerHTML).toContain(loginMocks.sellerLoginData.name);
  });

  test(
    'Checks user redirection to login page after clicking logout button',
    async () => {
      await waitFor(() => {});

      const checkoutButton = screen.getByTestId(navBarMocks.checkoutButton);

      userEvent.click(checkoutButton);

      await waitFor(() => {
        expect(history.location.pathname).toBe('/login');
      });
    },
  );
});
