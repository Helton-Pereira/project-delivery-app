import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import OrderHeader from '../components/OrderHeader';
import NavBarCustomer from '../components/NavBar.Customer';
import TableOrderDatails from '../components/TableOrderDatails';
import useValidateAuth from '../hooks/useValidateAuth';
// import orderHeaderMock from '../utils/orderHeaderMock';
import api from '../services/requests';

function CustomerOrderDatails(props) {
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
  //
  return (
    <div>
      <NavBarCustomer />
      <h2> Detalhes do pedido </h2>
      {order && (
        <OrderHeader
          key={ order.id }
          id={ order.id }
          sellerName={ order.seller.name }
          status={ order.status }
          saleDate={ order.saleDate }
          totalPrice={ Number(order.totalPrice) }
        />
      )}
      <h2> Produtos </h2>
      {order && (<TableOrderDatails productsArray={ order.products } />) }
    </div>
  );
}

CustomerOrderDatails.propTypes = {
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default CustomerOrderDatails;
