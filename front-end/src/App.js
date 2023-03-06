import React from 'react';
import './App.css';
import { Route, Switch, Redirect } from 'react-router-dom';
import DeliveryAppProvider from './context/DeliveryAppProvider';
import Login from './pages/Login';
import Register from './pages/Register';
import CostumerCheckout from './pages/Customer.Checkout';
import CustomerProducts from './pages/Customer.Products';
import CustomerOrders from './pages/Customer.Orders';
import CustomerOrderDatails from './pages/Customer.Order.Details';

function App() {
  return (
    <DeliveryAppProvider>
      <Switch>
        <Route exact path="/login" component={ Login } />
        <Redirect exact from="/" to="/login" />
        <Route exact path="/register" component={ Register } />
        <Route exact path="/customer/checkout" component={ CostumerCheckout } />
        <Route exact path="/customer/orders/:id" component={ CustomerOrderDatails } />
        <Route exact path="/customer/products" component={ CustomerProducts } />
        <Route exact path="/customer/orders" component={ CustomerOrders } />
      </Switch>
    </DeliveryAppProvider>
  );
}

export default App;
