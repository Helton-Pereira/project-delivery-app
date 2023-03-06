import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';
import mocks from './helpers/mocks/login.mocks';

describe('Test the Login page', () => {
  test('Checks if the route is correct (/login)', () => {
    const { history } = renderWithRouter(<App />);
    const { pathname } = history.location;
    expect(pathname).toBe('/login');
  });

  test('Checks if the main elements exist', () => {
    renderWithRouter(<App />);

    const emailInput = screen.getByTestId(mocks.emailInput);
    const passwordInput = screen.getByTestId(mocks.passwordInput);
    const loginButton = screen.getByTestId(mocks.loginButton);
    const registerButton = screen.getByTestId(mocks.registerButton);

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
    expect(registerButton).toBeInTheDocument();
  });

  test('Checks if the user can type in the email and password inputs', () => {
    renderWithRouter(<App />);

    const emailInput = screen.getByTestId(mocks.emailInput);
    const inputPassword = screen.getByTestId(mocks.passwordInput);

    userEvent.type(emailInput, mocks.validEmail);
    userEvent.type(inputPassword, mocks.validPassword);

    expect(emailInput).toHaveValue(mocks.validEmail);
    expect(inputPassword).toHaveValue(mocks.validPassword);
  });

  test('Checks if login button can be clicked with valid email and password', () => {
    renderWithRouter(<App />);

    const emailInput = screen.getByTestId(mocks.emailInput);
    const passwordInput = screen.getByTestId(mocks.passwordInput);
    const loginButton = screen.getByTestId(mocks.loginButton);

    userEvent.type(emailInput, mocks.invalidEmail);
    expect(loginButton).toBeDisabled();

    userEvent.type(passwordInput, mocks.invalidPassword);
    expect(loginButton).toBeDisabled();

    userEvent.type(emailInput, mocks.validEmail);
    expect(loginButton).toBeDisabled();

    userEvent.type(passwordInput, mocks.validPassword);
    expect(loginButton).toBeEnabled(); // Both email and password must be valid to enable the button
  });

  test(
    'Checks if the invalid message element appears with non-existent email',
    async () => {
      renderWithRouter(<App />);

      const emailInput = screen.getByTestId(mocks.emailInput);
      const passwordInput = screen.getByTestId(mocks.passwordInput);
      const loginButton = screen.getByTestId(mocks.loginButton);

      userEvent.type(emailInput, 'test@test.com');
      userEvent.type(passwordInput, mocks.validPassword);
      userEvent.click(loginButton);

      await waitFor(() => {
        const invalidMessageElement = screen.getByTestId(mocks.invalidMessageElement);
        expect(invalidMessageElement).toBeInTheDocument();
        expect(invalidMessageElement.innerHTML).toContain('Invalid email');
      });
    },
  );

  test(
    'Checks if the invalid message element appears with non-existent password',
    async () => {
      renderWithRouter(<App />);

      const emailInput = screen.getByTestId(mocks.emailInput);
      const passwordInput = screen.getByTestId(mocks.passwordInput);
      const loginButton = screen.getByTestId(mocks.loginButton);

      userEvent.type(emailInput, mocks.validEmail);
      userEvent.type(passwordInput, '123456');
      userEvent.click(loginButton);

      await waitFor(() => {
        const invalidMessageElement = screen.getByTestId(mocks.invalidMessageElement);
        expect(invalidMessageElement).toBeInTheDocument();
        expect(invalidMessageElement.innerHTML).toContain('Invalid password');
      });
    },
  );

  test(
    'Checks user redirection to products page after clicking login button',
    async () => {
      const { history } = renderWithRouter(<App />);

      const emailInput = screen.getByTestId(mocks.emailInput);
      const passwordInput = screen.getByTestId(mocks.passwordInput);
      const loginButton = screen.getByTestId(mocks.loginButton);

      userEvent.type(emailInput, mocks.validEmail);
      userEvent.type(passwordInput, mocks.validPassword);
      userEvent.click(loginButton);

      await waitFor(() => {
        expect(history.location.pathname).toBe('/customer/products');
      });
    },
  );

  test(
    'Checks user redirection to register page after clicking register button',
    async () => {
      const { history } = renderWithRouter(<App />);

      const registerButton = screen.getByTestId(mocks.registerButton);

      userEvent.click(registerButton);

      await waitFor(() => {
        expect(history.location.pathname).toBe('/register');
      });
    },
  );
});
