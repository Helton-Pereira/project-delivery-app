// import NavbarCustomer from '../components/Navbar.Custumer';
import PropTypes from 'prop-types';
import { useState } from 'react';
import FormOrderCheckout from '../components/FormOrderCheckout';
import NavBarCustomer from '../components/NavBar.Customer';
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

  const makeObjPost = () => ({
    name: '',
    seller: newOrder.seller,
    totalPrice: 0,
    deliveryAddress: newOrder.deliveryAddress,
    deliveryNumber: newOrder.deliveryNumber,
    productsId: [],
    quantities: [],
  });

  const handleSubmitOrder = async (event) => {
    event.preventDefault();
    try {
      const id = '0011177778888';
      console.log(makeObjPost());
      /* await requestSale(newOrder); */
      history.push(`/customer/orders/${id}`);
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  return (
    <main>
      <h1>Checkout-Page</h1>
      <NavBarCustomer />
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
