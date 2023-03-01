import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';
import mocks from './helpers/mocks/login.mocks';
import userEvent from '@testing-library/user-event';
import Login from '../pages/Login';

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

  test('Checks if the user is able to click the login button after inserting a valid email and password', () => {
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

  // test('Checks if the invalid message element appears when a non-existent e-mail is inserted', () => {
  //   renderWithRouter(<App />);

  //   const emailInput = screen.getByTestId(mocks.emailInput);
  //   const passwordInput = screen.getByTestId(mocks.passwordInput);
  //   const loginButton = screen.getByTestId(mocks.loginButton);

  //   userEvent.type(emailInput, 'test@test.com');
  //   userEvent.type(passwordInput, mocks.validPassword);
  //   userEvent.click(loginButton)

  //   expect(screen.getByTestId(mocks.invalidMessageElement)).toBeInTheDocument();
  //   expect(screen.getByTestId(mocks.invalidMessageElement)).toHaveValue('Invalid Email');
  // });

  // test('Checks if the invalid message element appears when a non-existent password is inserted', () => {
  //   renderWithRouter(<App />);

  //   const emailInput = screen.getByTestId(mocks.emailInput);
  //   const passwordInput = screen.getByTestId(mocks.passwordInput);
  //   const loginButton = screen.getByTestId(mocks.loginButton);

  //   userEvent.type(emailInput, mocks.validEmail);
  //   userEvent.type(passwordInput, '123456');
  //   userEvent.click(loginButton)

  //   expect(screen.getByTestId(mocks.invalidMessageElement)).toBeInTheDocument();
  //   expect(screen.getByTestId(mocks.invalidMessageElement)).toHaveValue('Invalid Password');
  // });

  // test('Checks if the user is redirected to products page after clicking the login button', () => {
  //   const { history } = renderWithRouter(<App />);

  //   const emailInput = screen.getByTestId(mocks.emailInput);
  //   const passwordInput = screen.getByTestId(mocks.passwordInput);
  //   const loginButton = screen.getByTestId(mocks.loginButton);

  //   userEvent.type(emailInput, mocks.validEmail);
  //   userEvent.type(passwordInput, mocks.validPassword);
  //   userEvent.click(loginButton);

  //   expect(history.location.pathname).toBe('/customer/products');
  // });
});
