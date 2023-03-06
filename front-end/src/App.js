import React from 'react';
import './App.css';
import { Route, Switch, Redirect } from 'react-router-dom';
import DeliveryAppProvider from './context/DeliveryAppProvider';
import Login from './pages/Login';
import Register from './pages/Register';
import CostumerCheckout from './pages/Customer.Checkout';
import CustomerProducts from './pages/Customer.Products';
import CustomerOrders from './pages/Customer.Orders';
import SellerOrders from './pages/Seller.Orders';

function App() {
  return (
    <DeliveryAppProvider>
      <Switch>
        <Route exact path="/login" component={ Login } />
        <Redirect exact from="/" to="/login" />
        <Route exact path="/register" component={ Register } />
        <Route exact path="/customer/checkout" component={ CostumerCheckout } />
        <Route exact path="/customer/orders/:id" />
        <Route exact path="/customer/products" component={ CustomerProducts } />
        <Route exact path="/customer/orders" component={ CustomerOrders } />
        <Route exact path="/seller/orders" component={ SellerOrders } />
      </Switch>
    </DeliveryAppProvider>
  );
}

export default App;
