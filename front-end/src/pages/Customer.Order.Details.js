import React, { useEffect, useState } from 'react';
import OrderHeader from '../components/OrderHeader';
import NavBarCustomer from '../components/NavBar.Customer';
import TableOrderDatails from '../components/TableOrderDatails';
// import useValidateAuth from '../hooks/useValidateAuth';
import orderHeaderMock from '../utils/orderHeaderMock';

function CustomerOrderDatails() {
  const [orderId, setOrderId] = useState([]);
  // const [auth, setAuth] = useState(false);

  // useValidateAuth(props, setAuth);

  useEffect(() => {
    const getOrder = async () => {
      // const data = await api.requestData('/customer/orders/${id}');
      setOrderId(orderHeaderMock);
    };
    getOrder();
    // console.log(auth);
  }, []);

  return (
    <div>
      <NavBarCustomer />
      <h2> Detalhes do pedido </h2>
      {orderId && (orderId.map((order) => (
        <OrderHeader
          key={ order.id }
          id={ order.id }
          sellerName={ order.sellerName }
          status={ order.status }
          saleDate={ order.saleDate }
          totalPrice={ Number(order.totalPrice) }
        />
      )))}
      <h2> Produtos </h2>
      <TableOrderDatails />
    </div>
  );
}

export default CustomerOrderDatails;
