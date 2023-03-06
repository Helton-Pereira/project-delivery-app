import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';
import registerMocks from './helpers/mocks/register.mock';
import loginMocks from './helpers/mocks/login.mocks';
import api from '../services/requests';

describe('Test the Register page', () => {
  test('Checks if all elements exist', () => {
    renderWithRouter(<App />, { initialEntries: ['/register'] });

    const inputName = screen.getByTestId(registerMocks.nameInput);
    const inputEmail = screen.getByTestId(registerMocks.emailInput);
    const inputPassword = screen.getByTestId(registerMocks.passwordInput);
    const buttonRegister = screen.getByTestId(registerMocks.registerButton);

    expect(inputName).toBeInTheDocument();
    expect(inputEmail).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();
    expect(buttonRegister).toBeInTheDocument();
  });

  test('Checks if the user can type in name, email and password inputs', () => {
    renderWithRouter(<App />, { initialEntries: ['/register'] });

    const inputName = screen.getByTestId(registerMocks.nameInput);
    const inputEmail = screen.getByTestId(registerMocks.emailInput);
    const inputPassword = screen.getByTestId(registerMocks.passwordInput);

    userEvent.type(inputName, registerMocks.validName);
    userEvent.type(inputEmail, registerMocks.validEmail);
    userEvent.type(inputPassword, registerMocks.validPassword);

    expect(inputName).toHaveValue(registerMocks.validName);
    expect(inputEmail).toHaveValue(registerMocks.validEmail);
    expect(inputPassword).toHaveValue(registerMocks.validPassword);
  });

  test('Checks if register button can be clicked with valid input values', () => {
    renderWithRouter(<App />, { initialEntries: ['/register'] });

    const inputName = screen.getByTestId(registerMocks.nameInput);
    const inputEmail = screen.getByTestId(registerMocks.emailInput);
    const inputPassword = screen.getByTestId(registerMocks.passwordInput);
    const buttonRegister = screen.getByTestId(registerMocks.registerButton);

    userEvent.type(inputName, registerMocks.invalidName);
    expect(buttonRegister).toBeDisabled();

    userEvent.type(inputEmail, registerMocks.invalidEmail);
    expect(buttonRegister).toBeDisabled();

    userEvent.type(inputPassword, registerMocks.invalidPassword);
    expect(buttonRegister).toBeDisabled();

    userEvent.type(inputName, registerMocks.validName);
    expect(buttonRegister).toBeDisabled();

    userEvent.type(inputEmail, registerMocks.validEmail);
    expect(buttonRegister).toBeDisabled();

    userEvent.type(inputPassword, registerMocks.validPassword);
    expect(buttonRegister).toBeEnabled();
  });

  test(
    'Checks user redirection to products page after clicking register button',
    async () => {
      jest.spyOn(api, 'requestLogin')
        .mockImplementation(() => (
          {
            status: 201,
            data: loginMocks.loginData }
        ));

      const { history } = renderWithRouter(<App />, { initialEntries: ['/register'] });

      const inputName = screen.getByTestId(registerMocks.nameInput);
      const inputEmail = screen.getByTestId(registerMocks.emailInput);
      const inputPassword = screen.getByTestId(registerMocks.passwordInput);
      const buttonRegister = screen.getByTestId(registerMocks.registerButton);

      userEvent.type(inputName, registerMocks.validName);
      userEvent.type(inputEmail, registerMocks.validEmail);
      userEvent.type(inputPassword, registerMocks.validPassword);
      userEvent.click(buttonRegister);

      await waitFor(() => {
        localStorage.setItem('user', JSON.stringify(loginMocks.loginData));

        expect(history.location.pathname).toBe('/customer/products');
      });
    },
  );
});
