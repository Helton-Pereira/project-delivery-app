import React from 'react';
import './App.css';
import { Route, Switch, Redirect } from 'react-router-dom';
import DeliveryAppProvider from './context/DeliveryAppProvider';
import Login from './pages/Login';

function App() {
  return (
    <DeliveryAppProvider>
      <Switch>
        <Route exact path="/login" component={ Login } />
        <Redirect exact from="/" to="/login" />
      </Switch>
    </DeliveryAppProvider>
  );
}

export default App;
