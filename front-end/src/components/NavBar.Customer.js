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
          <span
            data-testid="customer_products__element-navbar-user-full-name"
          >
            Nome
            { name }
          </span>
        </div>
        <div>
          <button
            type="submit"
            data-testid="customer_products__element-navbar-link-logout"
            onClick={ handleLogout }
          >
            Sair
          </button>
        </div>
      </nav>
    </main>
  );
}

export default NavBarCustomer;
