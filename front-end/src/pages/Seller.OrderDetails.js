import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import useValidateAuth from '../hooks/useValidateAuth';
import api from '../services/requests';
import HeaderSellerOrderDetails from '../components/Header.SellerOrderDetails';
import TableSellerOrderDetails from '../components/Table.SellerOrderDetails';
import NavBarSeller from '../components/NavBar.Seller';

function SellerOrderDetails(props) {
  const [order, setOrder] = useState(null);
  const { history } = props;
  const [auth, setAuth] = useState(false);

  useValidateAuth(props, setAuth);

  useEffect(() => {
    const getOrder = async () => {
      const url = history.location.pathname;
      const data = await api.requestData(url);
      console.log(data);
      setOrder(data);
    };
    getOrder();
    console.log(auth);
  }, []);

  return (
    <div>
      <NavBarSeller />
      <h2> Detalhes do pedido </h2>
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
      <h2> Produtos </h2>
      {order && (<TableSellerOrderDetails productsArray={ order.products } />) }
    </div>
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
