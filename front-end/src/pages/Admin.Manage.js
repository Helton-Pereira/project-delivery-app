// import { useState } from 'react';
import PropTypes from 'prop-types';
import NavBarAdmin from '../components/NavBar.Admin';
// import api from '../services/requests';
// import useValidateAuth from '../hooks/useValidateAuth';
import FormNewUser from '../components/FormNewUser';
import TableAdmin from '../components/TableAdmin';

function AdminManage() {
  // const [auth, setAuth] = useState(false);
  // useValidateAuth(props, setAuth);

  // const userArrayMock = [
  //   {
  //     id: 1,
  //     name: 'Shaolin',
  //     email: 'email1',
  //     role: 'seller',
  //   },
  //   {
  //     id: 2,
  //     name: 'Zezin',
  //     email: 'email1',
  //     role: 'seller',
  //   },
  //   {
  //     id: 3,
  //     name: 'Doidin',
  //     email: 'email1',
  //     role: 'seller',
  //   },
  //   {
  //     id: 4,
  //     name: 'Cuphead',
  //     email: 'email1',
  //     role: 'seller',
  //   },
  // ];

  return (
    <main>
      <NavBarAdmin />
      <FormNewUser />
      <TableAdmin />
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
