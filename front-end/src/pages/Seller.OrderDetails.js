import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import useValidateAuth from '../hooks/useValidateAuth';
import api from '../services/requests';
import HeaderSellerOrderDetails from '../components/Header.SellerOrderDetails';
import TableSellerOrderDetails from '../components/Table.SellerOrderDetails';
import NavBarSeller from '../components/NavBar.Seller';
import '../styles/seller.navbar.css';
import '../styles/seller.order-details.css';
import '../styles/seller.order-details.header.css';
import '../styles/seller.order-details.table.css';

function SellerOrderDetails(props) {
  const [order, setOrder] = useState(null);
  const { history } = props;
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
    <main className="seller-order-details-main">
      <NavBarSeller />
      <h2>Detalhes do Pedido</h2>

      <section className="seller-order-details-container">
        {order && (
          <HeaderSellerOrderDetails
            key={ order.id }
            id={ order.id }
            status={ order.status }
            saleDate={ order.saleDate }
            totalPrice={ Number(order.totalPrice) }
            setOrder={ setOrder }
          />
        )}
        {order && (<TableSellerOrderDetails productsArray={ order.products } />) }
      </section>
    </main>
  );
}

SellerOrderDetails.propTypes = {
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default SellerOrderDetails;
