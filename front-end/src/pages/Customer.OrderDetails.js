import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import HeaderCustomerOrderDetails from '../components/Header.CustomerOrderDetails';
import NavBarCustomer from '../components/NavBar.Customer';
import TableCustomerOrderDetails from '../components/Table.CustomerOrderDetails';
import useValidateAuth from '../hooks/useValidateAuth';
import api from '../services/requests';
import '../styles/customer.navbar.css';
import '../styles/customer.order-details.css';
import '../styles/customer.order-details.header.css';
import '../styles/customer.order-details.table.css';

function CustomerOrderDetails(props) {
  const [order, setOrder] = useState(null);
  const history = useHistory();
  const [auth, setAuth] = useState(false);

  useValidateAuth(props, setAuth);

  useEffect(() => {
    const getOrder = async () => {
      const url = history.location.pathname;
      const data = await api.requestData(url);
      setOrder(data);
    };
    getOrder();
    console.log(auth);
  }, []);

  return (
    <main className="customer-order-details-main">
      <NavBarCustomer />
      <h2>Detalhes do Pedido</h2>

      <section className="customer-order-details-container">
        {order && (
          <HeaderCustomerOrderDetails
            key={ order.id }
            id={ order.id }
            sellerName={ order.seller.name }
            status={ order.status }
            saleDate={ order.saleDate }
            totalPrice={ Number(order.totalPrice) }
            setOrder={ setOrder }
          />
        )}
        {order && (<TableCustomerOrderDetails productsArray={ order.products } />) }
      </section>
    </main>
  );
}

export default CustomerOrderDetails;
