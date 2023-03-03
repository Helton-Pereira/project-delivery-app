import { Link, useHistory } from 'react-router-dom';

function NavBarCustomer() {
  const history = useHistory();

  // const user = localStorage.getItem('user');
  // const nameUser = JSON.parse(user).name;

  const nameUser = 'Usuário'; // mock

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
          <span
            data-testid="customer_products__element-navbar-user-full-name"
          >
            Nome
            { nameUser }
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
