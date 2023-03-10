import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import CardSellerOrder from '../components/Card.SellerOrder';
import NavBarSeller from '../components/NavBar.Seller';
import api from '../services/requests';
import useValidateAuth from '../hooks/useValidateAuth';

function SellerOrders(props) {
  const { history } = props;
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useState(false);

  useValidateAuth(props, setAuth);

  useEffect(() => {
    const getOrders = async () => {
      const data = await api.requestData('/seller/orders');
      setOrders(data);
    };
    getOrders();
    console.log(auth); // Provisório, só para não dar erro no linter | auth será utilizado na tela de Loading
  }, []);

  return (
    <main>

      <NavBarSeller />

      {orders.map((order) => (
        <CardSellerOrder
          history={ history }
          key={ order.id }
          id={ order.id }
          status={ order.status }
          saleDate={ order.saleDate }
          totalPrice={ Number(order.totalPrice) }
          deliveryAddress={ order.deliveryAddress }
          deliveryNumber={ order.deliveryNumber }
        />
      ))}

    </main>
  );
}

SellerOrders.propTypes = {
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default SellerOrders;
