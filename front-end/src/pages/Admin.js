import { useState } from 'react';
import NavBarAdmin from '../components/NavBar.Admin';
import FormAdmin from '../components/Form.Admin';
import useValidateAuth from '../hooks/useValidateAuth';
import TableAdmin from '../components/Table.Admin';
import '../styles/admin.navbar.css';
import '../styles/admin.css';
import '../styles/admin.form.css';
import '../styles/admin.table.css';

function AdminManage(props) {
  const [auth, setAuth] = useState(false);
  const [users, setUsers] = useState([]);
  console.log(auth); // Provisório, só para não dar erro no linter | auth será utilizado na tela de Loading
  useValidateAuth(props, setAuth);

  return (
    <main>
      <NavBarAdmin />
      <section className="admin-manage-container">
        <h2>Cadastrar novo usuário</h2>
        <FormAdmin setUsers={ setUsers } />
        <h2>Lista de usuários</h2>
        <TableAdmin users={ users } setUsers={ setUsers } />
      </section>
    </main>
  );
}

export default AdminManage;
