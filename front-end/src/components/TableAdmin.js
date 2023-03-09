// import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import api from '../services/requests';

function TableAdmin() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      const data = await api.requestData('admin/manage/users');
      console.log(data);
      setUsers(data);
    };
    getUsers();
  }, []);

  const removeUserFromArray = (id) => {
    const newArray = users.filter((user) => user.id !== id);
    setUsers(newArray);
  };

  const handleClickRemoveUser = async (id) => {
    try {
      console.log(id);
      await api.deleteById(`admin/manage/users/${id}`);
      removeUserFromArray(id);
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  const fillTableDescription = () => {
    const tableElement = users.map((user, i) => {
      const {
        id,
        name,
        email,
        role,
      } = user;

      return (
        <tr key={ i }>
          <td
            data-testid={
              `admin_manage__element-user-table-item-number-${i}`
            }
          >
            { (i + 1) }
          </td>
          <td data-testid={ `admin_manage__element-user-table-name-${i}` }>
            { name }
          </td>
          <td data-testid={ `admin_manage__element-user-table-email-${i}` }>
            { email }
          </td>
          <td data-testid={ `admin_manage__element-user-table-role-${i}` }>
            { role }
          </td>
          <td>
            <button
              name="remove"
              data-testid={ `admin_manage__element-user-table-remove-${i}` }
              type="button"
              onClick={ () => handleClickRemoveUser(id) }
            >
              Excluir
            </button>
          </td>
        </tr>
      );
    });
    return tableElement;
  };

  return (
    <div>
      Lista de Usuários
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Tipo</th>
            <th>Excluir</th>
          </tr>
        </thead>
        <tbody>{fillTableDescription()}</tbody>
      </table>
    </div>
  );
}

// TableAdmin.propTypes = {
//   usersArray: PropTypes.arrayOf(
//     PropTypes.shape({
//       id: PropTypes.number.isRequired,
//       name: PropTypes.string.isRequired,
//       email: PropTypes.string.isRequired,
//       role: PropTypes.string.isRequired,
//     }),
//   ).isRequired,
// };

export default TableAdmin;
