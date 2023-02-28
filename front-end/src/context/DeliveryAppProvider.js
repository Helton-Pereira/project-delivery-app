// import React, { useReducer } from 'react';
import PropTypes from 'prop-types';

import DeliveryAppContext from './DeliveryAppContext';

// import {
//   recipesReducer,
//   RECIPES_INITIAL_STATE,
//   USER_INITIAL_STATE,
//   userReducer } from '../services/reducers';

export default function DeliveryAppProvider({ children }) {
  // const [recipes, recipesDispatch] = useReducer(recipesReducer, RECIPES_INITIAL_STATE);
  // const [user, userDispatch] = useReducer(userReducer, USER_INITIAL_STATE);

  // const contextValue = {
  //   recipes,
  //   recipesDispatch,
  //   user,
  //   userDispatch,
  // };
  return (
    <DeliveryAppContext.Provider value={ 0 }>
      {children}
    </DeliveryAppContext.Provider>
  );
}

DeliveryAppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
