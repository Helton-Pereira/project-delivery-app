import PropTypes from 'prop-types';

function TableAdmin({ usersArray }) {
  const fillTableDescription = () => {
    const users = usersArray;
    const tableElement = users.map((element, i) => {
      const {
        name,
        email,
        role,
      } = element;

      return (
        <tr key={ i }>
          <td
            data-testid={
              `admin_manage__element-user-table-item-number-${i}`
            }
          >
            { (i + 1) }
          </td>
          <td data-testid={ `admin_manage__input-email-${i}` }>
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
              onClick={ handleClickRemove }
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
      <h2 data-testid="customer_order_details__element-order-total-price">
        Total:
        { `${convertPrice(totalCart)}` }
      </h2>
    </div>
  );
}

TableAdmin.propTypes = {
  usersArray: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      role: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default TableAdmin;
