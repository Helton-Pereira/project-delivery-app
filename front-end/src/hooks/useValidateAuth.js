import { useEffect } from 'react';
import browserStorage from 'store';

export default (props, setAuthState, setUserState) => {
  useEffect(() => {
    (async () => {
      const { history } = props;
      const data = await browserStorage.get('userData');

      if (!data.token) {
        setUserState({ ...data, token: '' });
        history.push('/login');
      }

      setAuthState(true);
    })();
  }, []);
};
