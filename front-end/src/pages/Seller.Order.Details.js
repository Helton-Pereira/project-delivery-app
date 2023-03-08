import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import useValidateAuth from '../hooks/useValidateAuth';
import api from '../services/requests';
import OrderHeaderSeller from '../components/OrderHeaderSeller';
import TableOrderDatailsSeller from '../components/TableOrderDetailsSeller';
import NavBarSeller from '../components/NavBar.Seller';

function SellerOrderDatails(props) {
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
        <OrderHeaderSeller
          key={ order.id }
          id={ order.id }
          status={ order.status }
          saleDate={ order.saleDate }
          totalPrice={ Number(order.totalPrice) }
        />
      )}
      <h2> Produtos </h2>
      {order && (<TableOrderDatailsSeller productsArray={ order.products } />) }
    </div>
  );
}

SellerOrderDatails.propTypes = {
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default SellerOrderDatails;
