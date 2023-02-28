import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import Login from '../pages/Login';
import renderWithRouter from './helpers/renderWithRouter';

const testUserInputEmail = 'common_login__input-email';
const testUserInputPassword = 'common_login__input-password';
const testButtonLogin = 'common_login__button-login';
const testButtonRegister = 'common_login__button-register';
const testUserEmail = 'test@test.com';
const testUserPassword = '1234567';

describe('Test the Login page', () => {  
  test('Checks if route is correct (/login), if the email, password and login button exists', () => {
    const { history } = renderWithRouter(<App />);
    const { pathname } = history.location;
    expect(pathname).toBe('/login');   
  });

  test('Checks if the email, password and login button exists', () => {
    renderWithRouter(<App />);
    
    const inputEmail = screen.getByTestId(testUserInputEmail);
    const inputPassword = screen.getByTestId(testUserInputPassword);
    const buttonLogin = screen.getByTestId(testButtonLogin);
    const buttonRegister = screen.getByTestId(testButtonRegister);

    expect(inputEmail).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();
    expect(buttonLogin).toBeInTheDocument();
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
