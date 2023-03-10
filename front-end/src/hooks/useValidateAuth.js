// import { useEffect } from 'react';
import browserStorage from 'store';
import api from '../services/requests';

export default (props) => {
  const { history } = props;

  const data = browserStorage.get('user');

  if (!data || !data.token) {
    browserStorage.remove('user');
    history.push('/login');
  } else {
    api.setToken(data.token);
  }
};

// export default (props, setAuthState) => {
//   useEffect(() => {
//     const { history } = props;
//     const data = browserStorage.get('user');

//     if (!data.token) {
//       browserStorage.remove('user');
//       history.push('/login');
//     }

//     api.setToken(data.token);
//     setAuthState(true);
//   }, []);
// };
