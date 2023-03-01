import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';
import mocks from './helpers/mocks/login.mocks';
// import userEvent from '@testing-library/user-event';
// import Login from '../pages/Login';

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

  // test('Checks if the user can type in the email and password inputs', () => {
  //   renderWithRouter(<Login />);

  //   const inputEmail = screen.getByTestId(testUserInputEmail);
  //   const inputPassword = screen.getByTestId(testUserInputPassword);

  //   userEvent.type(inputEmail, testUserEmail);
  //   userEvent.type(inputPassword, testUserPassword);

  //   expect(inputEmail).toHaveValue(testUserEmail);
  //   expect(inputPassword).toHaveValue(testUserPassword);
  // });

  // test('Checks if the user is able to click the sign in button after a valid email address and password of 6 or more characters', () => {
  //   renderWithRouter(<Login />);

  //   const inputEmail = screen.getByTestId(testUserInputEmail);
  //   const inputPassword = screen.getByTestId(testUserInputPassword);
  //   const button = screen.getByTestId(testButtonEnter);

  //   userEvent.type(inputEmail, 'incorrectEmail');
  //   expect(button).toBeDisabled();

  //   userEvent.type(inputPassword, '12345');
  //   expect(button).toBeDisabled();

  //   userEvent.type(inputEmail, testUserEmail);
  //   userEvent.type(inputPassword, testUserPassword);
  //   expect(button).toBeEnabled();
  // });

  // test('Checks if the user is redirected to the food page after clicking the enter button', () => {
  //   const { history } = renderWithRouter(<App />);

  //   const inputEmail = screen.getByTestId(testUserInputEmail);
  //   const inputPassword = screen.getByTestId(testUserInputPassword);
  //   const button = screen.getByTestId(testButtonEnter);

  //   userEvent.type(inputEmail, testUserEmail);
  //   userEvent.type(inputPassword, testUserPassword);
  //   userEvent.click(button);

  //   expect(history.location.pathname).toBe('/meals');

  //   const mealsTokenLocalStorage = localStorage.getItem('mealsToken');
  //   const drinksTokenLocalStorage = localStorage.getItem('drinksToken');

  //   expect(mealsTokenLocalStorage).toBe('1');
  //   expect(drinksTokenLocalStorage).toBe('1');
  // });
});
//
