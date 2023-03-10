// import NavbarCustomer from '../components/Navbar.Custumer';
import PropTypes from 'prop-types';
import { useState, useContext } from 'react';
import FormCheckout from '../components/Form.Checkout';
import NavBarCustomer from '../components/NavBar.Customer';
import TableCheckout from '../components/Table.Checkout';
import DeliveryAppContext from '../context/DeliveryAppContext';
import api from '../services/requests';

function CostumerCheckout(props) {
  const INITIAL_STATE = {
    seller: '',
    deliveryAddress: '',
    deliveryNumber: '',
  };
  const [newOrder, setNewOrder] = useState(INITIAL_STATE);
  const { cart, user } = useContext(DeliveryAppContext);

  const { history } = props;

  let totalPrice = 0;
  const productsId = [];
  const quantities = [];

  const makeObjPost = () => ({
    name: user.name,
    seller: 'fulana pereira',
    totalPrice,
    deliveryAddress: newOrder.deliveryAddress,
    deliveryNumber: newOrder.deliveryNumber,
    productsId,
    quantities,
  });

  const handleCartData = () => {
    // const { products } = this.props;
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
      // const id = '0011177778888';
      const body = makeObjPost();
      const { id } = await api.requestNewOrder('/customer/checkout', body, user.token);
      console.log(id);
      history.push(`/customer/orders/${id}`);
    } catch (error) {
      // handleCartData();
      // console.log(makeObjPost());
      console.log(error);
    }
  };

  return (
    <main>
      <h1>Checkout-Page</h1>
      <NavBarCustomer />
      <h2>NavbarCustomer</h2>
      <div className="Checkout-container">
        <h2>Finalizar Pedido</h2>
        <TableCheckout setNewOrder={ setNewOrder } />
        <div>
          <h2>Detalhes e Endereço para Entrega</h2>
          <FormCheckout
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
