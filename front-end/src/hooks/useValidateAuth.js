import { useEffect } from 'react';
import browserStorage from 'store';

export default (props, setAuthState) => {
  useEffect(() => {
    const { history } = props;
    const data = browserStorage.get('user');

    if (!data.token) {
      browserStorage.remove('user');
      history.push('/login');
    }

    setAuthState(true);
  }, []);
};
