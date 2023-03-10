import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';
import loginMocks from './helpers/mocks/login.mocks';
import checkoutMocks from './helpers/mocks/customer.checkout.mocks';
import api from '../services/requests';
import conversions from '../utils/conversions';

describe('Test the Checkout page', () => {
  let history;

  beforeEach(() => {
    jest.spyOn(api, 'requestData').mockImplementation(() => checkoutMocks.sellers);

    history = renderWithRouter(<App />).history;

    localStorage.setItem('user', JSON.stringify(loginMocks.loginData));
    localStorage.setItem('cart', JSON.stringify(checkoutMocks.cart));

    history.push('/customer/checkout');
  });

  afterEach(() => {
    jest.clearAllMocks();
    localStorage.setItem('cart', JSON.stringify(checkoutMocks.cart));
  });

  test('Checks if the form elements exist', async () => {
    await waitFor(() => {});

    renderWithRouter(<App />);

    const sellersSelect = screen.getByTestId(checkoutMocks.formElements.sellers);
    const addressInput = screen.getByTestId(checkoutMocks.formElements.address);
    const addressNumberInput = screen.getByTestId(checkoutMocks.formElements.addressNumber);
    const submitButton = screen.getByTestId(checkoutMocks.formElements.submitButton);

    expect(sellersSelect).toBeInTheDocument();
    expect(addressInput).toBeInTheDocument();
    expect(addressNumberInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  test('Checks if the table elements exist', async () => {
    await waitFor(() => {});

    const totalSingleEl = screen.getByTestId(checkoutMocks.tableElements.total);
    expect(totalSingleEl).toBeInTheDocument();

    checkoutMocks.cart.forEach((cart, index) => {
      const numberEl = screen.getByTestId(`${checkoutMocks.tableElements.number}${index}`);
      const nameEl = screen.getByTestId(`${checkoutMocks.tableElements.name}${index}`);
      const quantityEl = screen.getByTestId(`${checkoutMocks.tableElements.quantity}${index}`);
      const priceEl = screen.getByTestId(`${checkoutMocks.tableElements.price}${index}`);
      const subtotalEl = screen.getByTestId(`${checkoutMocks.tableElements.subtotal}${index}`);
      const rmButtonEl = screen.getByTestId(`${checkoutMocks.tableElements.rmButton}${index}`);

      expect(numberEl).toBeInTheDocument();
      expect(numberEl.innerHTML).toBe((index + 1).toString());

      expect(nameEl).toBeInTheDocument();
      expect(nameEl.innerHTML).toBe(cart.name);

      expect(quantityEl).toBeInTheDocument();
      expect(quantityEl.innerHTML).toBe(cart.quantity.toString());

      expect(priceEl).toBeInTheDocument();
      expect(priceEl.innerHTML).toBe(conversions.convertPrice(cart.price));

      expect(subtotalEl).toBeInTheDocument();
      expect(subtotalEl.innerHTML).toBe(conversions.convertPrice(cart.price * cart.quantity));

      expect(rmButtonEl).toBeInTheDocument();
    });
  });

  test('Checks if the user can type in address inputs and use sellers select', async () => {
    await waitFor(() => {});

    const sellersSelect = screen.getByTestId(checkoutMocks.formElements.sellers);
    const addressInput = screen.getByTestId(checkoutMocks.formElements.address);
    const addressNumberInput = screen.getByTestId(checkoutMocks.formElements.addressNumber);

    userEvent.selectOptions(sellersSelect, [checkoutMocks.sellers[1].name]);
    userEvent.type(addressInput, checkoutMocks.entries.address);
    userEvent.type(addressNumberInput, checkoutMocks.entries.addressNumber);

    expect(sellersSelect).toHaveValue(checkoutMocks.sellers[1].name);
    expect(screen.getByRole('option', { name: checkoutMocks.sellers[1].name }).selected).toBe(true);
    expect(addressInput).toHaveValue(checkoutMocks.entries.address);
    expect(addressNumberInput).toHaveValue(Number(checkoutMocks.entries.addressNumber));
  });

  test('Checks if remove button delete order items', async () => {
    await waitFor(() => {});

    let tableRows = screen.getAllByRole('row');
    expect(tableRows).toHaveLength(3); // Head row + 2 items rows

    userEvent.click(screen.getByTestId(`${checkoutMocks.tableElements.rmButton}0`)); // Removes first item row
    expect(screen.getByTestId(`${checkoutMocks.tableElements.name}0`)).not.toBe(checkoutMocks.cart[0].name); // Checks if the current first element name is different from the previous one

    tableRows = screen.getAllByRole('row');
    expect(tableRows).toHaveLength(2); // Head row + 1 item row
  });

  test('Checks if remove button change order`s total price', async () => {
    await waitFor(() => {});

    const REGEX = /customer_checkout__element-order-table-sub-total-/i;
    const calculateOrderTotalPrice = (array) => array.reduce((acc, curr) => acc += Number(curr.innerHTML.replace(/\,/, '.')), 0);

    const totalPriceElement = screen.getByTestId(checkoutMocks.tableElements.total);
    let subtotalElements = screen.getAllByTestId(REGEX);
    let orderTotalPrice = calculateOrderTotalPrice(subtotalElements);

    expect(totalPriceElement.innerHTML).toContain(conversions.convertPrice(orderTotalPrice));

    userEvent.click(screen.getByTestId(`${checkoutMocks.tableElements.rmButton}1`)); // Removes second item row

    // Gets all the rows subtotals again and recalculates order`s total price
    subtotalElements = screen.getAllByTestId(REGEX);
    orderTotalPrice = calculateOrderTotalPrice(subtotalElements);

    expect(totalPriceElement.innerHTML).toContain(conversions.convertPrice(orderTotalPrice));
  });

  test(
    'Checks user redirection to order details page after clicking submit button',
    async () => {
      jest.spyOn(api, 'requestNewOrder').mockImplementation(() => ({ status: 201, id: 1 })); // Mocks order creation (Checkout page)

      jest.spyOn(api, 'requestData')
        .mockImplementationOnce(() => (checkoutMocks.sellers)) // Mocks api response that returns all sellers (Checkout page)
        .mockImplementationOnce(() => (checkoutMocks.orderDetails)); // Mocks api response that returns order details (Order details page)

      await waitFor(() => {});

      const sellersSelect = screen.getByTestId(checkoutMocks.formElements.sellers);
      const addressInput = screen.getByTestId(checkoutMocks.formElements.address);
      const addressNumberInput = screen.getByTestId(checkoutMocks.formElements.addressNumber);
      const submitButton = screen.getByTestId(checkoutMocks.formElements.submitButton);

      userEvent.selectOptions(sellersSelect, [checkoutMocks.sellers[1].name]);
      userEvent.type(addressInput, checkoutMocks.entries.address);
      userEvent.type(addressNumberInput, checkoutMocks.entries.addressNumber);
      userEvent.click(submitButton);

      await waitFor(() => {
        expect(history.location.pathname).toBe('/customer/orders/1');
      });
    },
  );
});
