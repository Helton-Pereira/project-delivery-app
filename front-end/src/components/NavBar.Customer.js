import { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import browserStorage from 'store';
import DeliveryAppContext from '../context/DeliveryAppContext';

function NavBarCustomer() {
  const { user: { name } } = useContext(DeliveryAppContext);

  const history = useHistory();

  const handleLogout = () => {
    browserStorage.remove('user');
    history.push('/login');
  };

  return (
    <nav className="navbar-customer">
      <section className="links-section">
        <Link
          to="/customer/products"
          data-testid="customer_products__element-navbar-link-products"
          className="products-link"
        >
          PRODUTOS
        </Link>

        <Link
          to="/customer/orders"
          data-testid="customer_products__element-navbar-link-orders"
          className="orders-link"
        >
          MEUS PEDIDOS
        </Link>
      </section>

      <section className="user-section">
        <span
          data-testid="customer_products__element-navbar-user-full-name"
          className="name-element"
        >
          { name }
        </span>

        <button
          type="submit"
          data-testid="customer_products__element-navbar-link-logout"
          onClick={ handleLogout }
        >
          SAIR
        </button>
      </section>

    </nav>
  );
}

export default NavBarCustomer;
