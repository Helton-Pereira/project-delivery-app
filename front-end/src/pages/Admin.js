import { useState } from 'react';
import NavBarAdmin from '../components/NavBar.Admin';
import FormAdmin from '../components/Form.Admin';
import useValidateAuth from '../hooks/useValidateAuth';
import TableAdmin from '../components/Table.Admin';
import '../styles/admin.navbar.css';

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

export default AdminManage;
