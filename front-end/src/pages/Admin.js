import { useState } from 'react';
import PropTypes from 'prop-types';
import NavBarAdmin from '../components/NavBar.Admin';
import FormAdmin from '../components/Form.Admin';
import useValidateAuth from '../hooks/useValidateAuth';
import TableAdmin from '../components/TableAdmin';

function AdminManage(props) {
  const [auth, setAuth] = useState(false);
  const [users, setUsers] = useState([]);
  console.log(auth); // Provisório, só para não dar erro no linter | auth será utilizado na tela de Loading
  useValidateAuth(props, setAuth);

  return (
    <main>
      <NavBarAdmin />
      <FormAdmin setUsers={ setUsers } />
      <TableAdmin users={ users } setUsers={ setUsers } />
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
