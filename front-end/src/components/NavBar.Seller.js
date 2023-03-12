import { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import browserStorage from 'store';
import DeliveryAppContext from '../context/DeliveryAppContext';

function NavBarSeller() {
  const { user: { name } } = useContext(DeliveryAppContext);

  const history = useHistory();

  const handleLogout = () => {
    browserStorage.remove('user');
    history.push('/login');
  };

  return (
    <nav className="navbar-seller">
      <section className="links-section">
        <Link
          to="/seller/orders"
          data-testid="customer_products__element-navbar-link-orders"
          className="orders-link"
        >
          <i className="material-icons">delivery_dining</i>
          PEDIDOS
        </Link>
      </section>

      <section className="user-section">
        <span
          data-testid="customer_products__element-navbar-user-full-name"
          className="name-element"
        >
          <i className="material-icons">person</i>
          { name }
        </span>
        <button
          type="submit"
          data-testid="customer_products__element-navbar-link-logout"
          onClick={ handleLogout }
        >
          <i className="material-icons">logout</i>
          SAIR
        </button>
      </section>
    </nav>
  );
}

export default NavBarSeller;
