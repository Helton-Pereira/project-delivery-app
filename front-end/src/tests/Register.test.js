import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
// import App from '../App';
import Register from '../pages/Register';
import renderWithRouter from './helpers/renderWithRouter';
import mock from './helpers/mocks/register.mock';

describe('Test the Register page', () => {
  test('Checks if the name, email, password and register button exists', () => {
    renderWithRouter(<Register />);

    const inputName = screen.getByTestId(mock.nameInput);
    const inputEmail = screen.getByTestId(mock.emailInput);
    const inputPassword = screen.getByTestId(mock.passwordInput);
    const buttonRegister = screen.getByTestId(mock.registerButton);

    expect(inputName).toBeInTheDocument();
    expect(inputEmail).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();
    expect(buttonRegister).toBeInTheDocument();
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
