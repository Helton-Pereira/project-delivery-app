import React from 'react';
import './App.css';
import { Route, Switch, Redirect } from 'react-router-dom';
import DeliveryAppProvider from './context/DeliveryAppProvider';
import Login from './pages/Login';
import Register from './pages/Register';
import CostumerCheckout from './pages/Customer.Checkout';

function App() {
  return (
    <DeliveryAppProvider>
      <Switch>
        <Route exact path="/login" component={ Login } />
        <Redirect exact from="/" to="/login" />
        <Route exact path="/register" component={ Register } />
        <Route exact path="/customer/checkout" component={ CostumerCheckout } />
      </Switch>
    </DeliveryAppProvider>
  );
}

export default App;
