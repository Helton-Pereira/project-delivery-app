import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { USER_INITIAL_STATE } from '../utils/initialStates';
import usePersistState from '../hooks/usePersistState';

import DeliveryAppContext from './DeliveryAppContext';

export default function DeliveryAppProvider({ children }) {
  const [user, setUser] = usePersistState('user', USER_INITIAL_STATE);
  const [cart, setCart] = usePersistState('cart', []);

  const contextValue = useMemo(() => ({
    user,
    setUser,
    cart,
    setCart,
  }), [user, cart]);

  return (
    <DeliveryAppContext.Provider value={ contextValue }>
      {children}
    </DeliveryAppContext.Provider>
  );
}

DeliveryAppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
