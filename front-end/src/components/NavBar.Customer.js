import { Link, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

function NavBarCustomer({ name }) {
  const history = useHistory();

  const handleLogout = () => {
    localStorage.removeItem('user');
    history.push('/login');
  };

  return (
    <main>
      <nav>
        <div>
          <Link
            to="/customer/products"
            data-testid="customer_products__element-navbar-link-products"
          >
            Produtos
          </Link>
        </div>
        <div>
          <Link
            to="/customer/orders"
            data-testid="customer_products__element-navbar-link-orders"
          >
            Pedidos
          </Link>
        </div>
        <div>
          <div
            data-testid="customer_products__element-navbar-user-full-name"
          >
            Nome
            { name }
          </div>
        </div>
        <div>
          <button
            type="submit"
            data-testid="customer_products__element-navbar-button-logout"
            onClick={ handleLogout }
          >
            Sair
          </button>
        </div>
      </nav>
    </main>
  );
}

NavBarCustomer.propTypes = {
  name: PropTypes.string.isRequired,
};

export default NavBarCustomer;
