import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import browserStorage from 'store';
import PropTypes from 'prop-types';

// sugestão construida com base no chatGpt
function PrivateRoute({ component: Component, ...rest }) {
  const data = browserStorage.get('user');
  return (
    <Route
      { ...rest }
      render={ (props) => (
        data ? (
          <Component { ...props } />
        ) : (
          <Redirect to={ { pathname: '/login' } } />
        )
      ) }
    />
  );
}

PrivateRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
};

export default PrivateRoute;
