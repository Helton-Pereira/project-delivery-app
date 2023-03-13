import PropTypes from 'prop-types';
import { useEffect } from 'react';
import api from '../services/requests';

function TableAdmin({ users, setUsers }) {
  // const [users, setUsers] = useState([]);

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
            className="admin-manage-table-item-order"
            data-testid={
              `admin_manage__element-user-table-item-number-${i}`
            }
          >
            { (i + 1) }
          </td>
          <td
            className="admin-manage-table-user-name"
            data-testid={ `admin_manage__element-user-table-name-${i}` }
          >
            { name }
          </td>
          <td
            className="admin-manage-table-user-email"
            data-testid={ `admin_manage__element-user-table-email-${i}` }
          >
            { email }
          </td>
          <td
            className="admin-manage-table-user-role"
            data-testid={ `admin_manage__element-user-table-role-${i}` }
          >
            { role }
          </td>
          <td className="admin-manage-table-user-remove">
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
    <section className="admin-manage-table">
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
    </section>
  );
}

TableAdmin.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      role: PropTypes.string.isRequired,
    }),
  ).isRequired,
  setUsers: PropTypes.func.isRequired,
};

export default TableAdmin;
