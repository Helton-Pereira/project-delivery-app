// import NavbarCustomer from '../components/Navbar.Custumer';
import PropTypes from 'prop-types';
import { useState } from 'react';
import FormOrderCheckout from '../components/FormOrderCheckout';
import TableOrderCheckout from '../components/TableOrderCheckout';

function CostumerCheckout(props) {
  const INITIAL_STATE = {
    name: '',
    seller: '',
    totalPrice: 0,
    deliveryAddress: '',
    deliveryNumber: '',
    productsId: [],
    quantities: [],
  };
  const [newOrder, setNewOrder] = useState(INITIAL_STATE);

  const { history } = props;

  const handleSubmitOrder = async (event) => {
    event.preventDefault();
    try {
      const id = '0011177778888';
      console.log(newOrder);
      /* await requestSale(newOrder); */
      history.push(`/customer/orders/${id}`);
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  return (
    <main>
      <h1>Checkout-Page</h1>
      {/* <NavbarCustomer /> */}
      <h2>NavbarCustomer</h2>
      <div className="Checkout-container">
        <h2>Finalizar Pedido</h2>
        <TableOrderCheckout setNewOrder={ setNewOrder } />
        <div>
          <h2>Detalhes e Endereço para Entrega</h2>
          <FormOrderCheckout
            handleSubmitOrder={ handleSubmitOrder }
            setNewOrder={ setNewOrder }
          />
        </div>
      </div>
    </main>
  );
}

CostumerCheckout.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default CostumerCheckout;
