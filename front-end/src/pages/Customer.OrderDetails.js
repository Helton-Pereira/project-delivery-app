import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import HeaderCustomerOrderDetails from '../components/Header.CustomerOrderDetails';
import NavBarCustomer from '../components/NavBar.Customer';
import TableCustomerOrderDetails from '../components/Table.CustomerOrderDetails';
import useValidateAuth from '../hooks/useValidateAuth';
// import orderHeaderMock from '../utils/orderHeaderMock';
import api from '../services/requests';

function CustomerOrderDetails(props) {
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
      <h2> Produtos </h2>
      {order && (<TableCustomerOrderDetails productsArray={ order.products } />) }
    </div>
  );
}

CustomerOrderDetails.propTypes = {
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default CustomerOrderDetails;
