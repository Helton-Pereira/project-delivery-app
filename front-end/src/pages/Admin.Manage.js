// import { useState } from 'react';
import PropTypes from 'prop-types';
import NavBarAdmin from '../components/NavBar.Admin';
// import api from '../services/requests';
// import useValidateAuth from '../hooks/useValidateAuth';
import FormAdmin from '../components/Form.Admin';

function AdminManage() {
  // const [auth, setAuth] = useState(false);
  // useValidateAuth(props, setAuth);

  // useEffect(() => {
  //   const getUsers = async () => {
  //     // const data = await api.requestData('/users'); // Aguardando implementação da rota.
  //     setOrders(mockedOrders);
  //   };
  //   getOrders();
  //   console.log(auth); // Provisório, só para não dar erro no linter | auth será utilizado na tela de Loading
  // }, []);

  return (
    <main>

      <NavBarAdmin />

      {/* {users.map((user, index) => (
        <table
          id={ index + 1 }
          nome={ history }
          email={ order.id }
          tipo={ order.id }
          excluir={ order.status }
        />
      ))} */}
      <FormAdmin />
    </main>
  );
}

AdminManage.propTypes = {
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default AdminManage;
