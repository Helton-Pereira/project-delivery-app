import React from 'react';
// import { screen, waitFor } from '@testing-library/react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';
import mocks from './helpers/mocks/register.mock';

describe('Test the Register page', () => {
  test('Checks if all elements exist', () => {
    renderWithRouter(<App />, { initialEntries: ['/register'] });

    const inputName = screen.getByTestId(mocks.nameInput);
    const inputEmail = screen.getByTestId(mocks.emailInput);
    const inputPassword = screen.getByTestId(mocks.passwordInput);
    const buttonRegister = screen.getByTestId(mocks.registerButton);

    expect(inputName).toBeInTheDocument();
    expect(inputEmail).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();
    expect(buttonRegister).toBeInTheDocument();
  });

  test('Checks if the user can type in name, email and password inputs', () => {
    renderWithRouter(<App />, { initialEntries: ['/register'] });

    const inputName = screen.getByTestId(mocks.nameInput);
    const inputEmail = screen.getByTestId(mocks.emailInput);
    const inputPassword = screen.getByTestId(mocks.passwordInput);

    userEvent.type(inputName, mocks.validName);
    userEvent.type(inputEmail, mocks.validEmail);
    userEvent.type(inputPassword, mocks.validPassword);

    expect(inputName).toHaveValue(mocks.validName);
    expect(inputEmail).toHaveValue(mocks.validEmail);
    expect(inputPassword).toHaveValue(mocks.validPassword);
  });

  test('Checks if register button can be clicked with valid input values', () => {
    renderWithRouter(<App />, { initialEntries: ['/register'] });

    const inputName = screen.getByTestId(mocks.nameInput);
    const inputEmail = screen.getByTestId(mocks.emailInput);
    const inputPassword = screen.getByTestId(mocks.passwordInput);
    const buttonRegister = screen.getByTestId(mocks.registerButton);

    userEvent.type(inputName, mocks.invalidName);
    expect(buttonRegister).toBeDisabled();

    userEvent.type(inputEmail, mocks.invalidEmail);
    expect(buttonRegister).toBeDisabled();

    userEvent.type(inputPassword, mocks.invalidPassword);
    expect(buttonRegister).toBeDisabled();

    userEvent.type(inputName, mocks.validName);
    expect(buttonRegister).toBeDisabled();

    userEvent.type(inputEmail, mocks.validEmail);
    expect(buttonRegister).toBeDisabled();

    userEvent.type(inputPassword, mocks.validPassword);
    expect(buttonRegister).toBeEnabled();
  });

  // test(
  //   'Checks user redirection to products page after clicking register button',
  //   async () => {
  //     const { history } = renderWithRouter(<App />, { initialEntries: ['/register'] });

  //     const inputName = screen.getByTestId(mocks.nameInput);
  //     const inputEmail = screen.getByTestId(mocks.emailInput);
  //     const inputPassword = screen.getByTestId(mocks.passwordInput);
  //     const buttonRegister = screen.getByTestId(mocks.registerButton);

  //     userEvent.type(inputName, mocks.validName);
  //     userEvent.type(inputEmail, mocks.validEmail);
  //     userEvent.type(inputPassword, mocks.validPassword);
  //     userEvent.click(buttonRegister);

  //     await waitFor(() => {
  //       expect(history.location.pathname).toBe('/customer/products');
  //     });
  //   },
  // );
});
