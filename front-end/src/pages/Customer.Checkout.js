// import NavbarCustomer from '../components/Navbar.Custumer';
import PropTypes from 'prop-types';
import { useState, useContext } from 'react';
import FormCheckout from '../components/Form.Checkout';
import NavBarCustomer from '../components/NavBar.Customer';
import TableCheckout from '../components/Table.Checkout';
import DeliveryAppContext from '../context/DeliveryAppContext';
import api from '../services/requests';
import { COSTUMER_CHECKOUT_INITIAL_STATE } from '../utils/initialStates';
import '../styles/customer.navbar.css';
import '../styles/customer.checkout.css';
import '../styles/customer.checkout.form.css';
import '../styles/customer.checkout.table.css';

// import useValidateAuth from '../hooks/useValidateAuth';

function CostumerCheckout(props) {
  // useValidateAuth(props);

  const [newOrder, setNewOrder] = useState(COSTUMER_CHECKOUT_INITIAL_STATE);
  const { cart, user } = useContext(DeliveryAppContext);

  const { history } = props;

  let totalPrice = 0;
  const productsId = [];
  const quantities = [];

  const makeObjPost = () => ({
    name: user.name,
    seller: 'Fulana Pereira',
    totalPrice,
    deliveryAddress: newOrder.deliveryAddress,
    deliveryNumber: newOrder.deliveryNumber,
    productsId,
    quantities,
  });

  const handleCartData = () => {
    const products = cart;
    products.forEach((product) => {
      const {
        id,
        price,
        quantity,
      } = product;
      totalPrice += (quantity * price);
      productsId.push(id);
      quantities.push(quantity);
    });

    totalPrice = totalPrice.toFixed(Number(2));
  };

  const handleSubmitOrder = async (event) => {
    event.preventDefault();
    try {
      handleCartData();
      const body = makeObjPost();
      console.log(body);
      const { id } = await api.requestNewOrder('/customer/checkout', body, user.token);
      history.push(`/customer/orders/${id}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main>
      <NavBarCustomer />
      <section className="checkout-container">
        <h2>Finalizar Pedido</h2>
        <TableCheckout />
        <h2>Detalhes e Endereço para Entrega</h2>
        <FormCheckout
          handleSubmitOrder={ handleSubmitOrder }
          setNewOrder={ setNewOrder }
        />
      </section>
    </main>
  );
}

CostumerCheckout.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default CostumerCheckout;
