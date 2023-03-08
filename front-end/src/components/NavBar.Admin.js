import { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import browserStorage from 'store';
import DeliveryAppContext from '../context/DeliveryAppContext';

function NavBarAdmin() {
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
            to="/seller/orders"
            data-testid="customer_products__element-navbar-link-orders"
          >
            Gerenciar Usuários
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

export default NavBarAdmin;
