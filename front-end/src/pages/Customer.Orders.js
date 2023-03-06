import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import CardOrders from '../components/Card.Orders';
import NavBarCustomer from '../components/NavBar.Customer';
// import api from '../services/requests';
import useValidateAuth from '../hooks/useValidateAuth';
import mockedOrders from '../utils/ordersMock';
//

function CustomerOrders(props) {
  const { history } = props;
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useState(false);

  useValidateAuth(props, setAuth);

  useEffect(() => {
    const getOrders = async () => {
      // const data = await api.requestData('/customer/orders'); // Aguardando implementação da rota. Após isso, não esquecer de apagar o mock.
      setOrders(mockedOrders);
    };
    getOrders();
    console.log(auth); // Provisório, só para não dar erro no linter | auth será utilizado na tela de Loading
  }, []);

  return (
    <main>

      <NavBarCustomer />

      {orders.map((order) => (
        <CardOrders
          history={ history }
          key={ order.id }
          id={ order.id }
          status={ order.status }
          saleDate={ order.saleDate }
          totalPrice={ Number(order.totalPrice) }
        />
      ))}

    </main>
  );
}

CustomerOrders.propTypes = {
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default CustomerOrders;
