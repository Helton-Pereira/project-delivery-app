import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import CardCustomerOrder from '../components/Card.CustomerOrder';
import NavBarCustomer from '../components/NavBar.Customer';
import api from '../services/requests';
import useValidateAuth from '../hooks/useValidateAuth';
import '../styles/customer.navbar.css';
import '../styles/customer.orders.css';
import '../styles/customer.order.card.css';

function CustomerOrders(props) {
  const history = useHistory();
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useState(false);

  useValidateAuth(props, setAuth);

  useEffect(() => {
    const getOrders = async () => {
      const data = await api.requestData('/customer/orders');
      setOrders(data);
    };
    getOrders();
    console.log(auth); // Provisório, só para não dar erro no linter | auth será utilizado na tela de Loading
  }, []);

  return (
    <main>
      <NavBarCustomer />

      <section className="customer-orders-container">
        {orders.map((order) => (
          <CardCustomerOrder
            history={ history }
            key={ order.id }
            id={ order.id }
            status={ order.status }
            saleDate={ order.saleDate }
            totalPrice={ Number(order.totalPrice) }
          />
        ))}
      </section>

    </main>
  );
}

export default CustomerOrders;
