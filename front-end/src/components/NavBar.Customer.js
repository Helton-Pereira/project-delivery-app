import { Link } from 'react-router-dom';

function NavBarCustomer() {
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
          <Link
            to="/produtos"
            data-testid="customer_products__element-navbar-user-full-name"
          >
            Nome
          </Link>
        </div>
        <div>
          <Link
            to="/login"
            data-testid="customer_products__element-navbar-link-logout"
          >
            Sair
          </Link>
        </div>

      </nav>
    </main>
  );
}

export default NavBarCustomer;
