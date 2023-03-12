import { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import CardProducts from '../components/Card.Products';
import NavBarCustomer from '../components/NavBar.Customer';
import api from '../services/requests';
import useValidateAuth from '../hooks/useValidateAuth';
import DeliveryAppContext from '../context/DeliveryAppContext';
import conversions from '../utils/conversions';
import '../styles/customer.navbar.css';
import '../styles/customer.products.css';
import '../styles/customer.product.card.css';

function CustomerProducts(props) {
  const [products, setProducts] = useState([]);
  const [totalValue, setTotalValue] = useState(0);
  const [auth, setAuth] = useState(false);

  const { cart } = useContext(DeliveryAppContext);

  useValidateAuth(props, setAuth);

  useEffect(() => {
    const total = cart.reduce(
      (acc, curr) => acc + (curr.price * curr.quantity),
      0,
    );
    setTotalValue(conversions.convertPrice(total));
  }, [cart]);

  const handleClickCart = (event) => {
    event.preventDefault();
    const { history } = props;
    console.log(auth); // Provisório, só para não dar erro no linter | auth será utilizado na tela de Loading
    history.push('/customer/checkout');
  };

  useEffect(() => {
    const getProducts = async () => {
      const data = await api.requestData('/customer/products');
      setProducts(data);
    };
    getProducts();
  }, []);

  return (
    <main>
      <NavBarCustomer />

      <section className="products-container">
        {products.map((product) => (
          <CardProducts
            key={ product.id }
            name={ product.name }
            price={ Number(product.price) }
            urlImage={ product.urlImage }
            id={ product.id }
          />
        ))}
      </section>

      <div className="cart-button-section">
        <button
          type="button"
          data-testid="customer_products__button-cart"
          className="btn btn-primary"
          disabled={ totalValue === '0,00' }
          onClick={ handleClickCart }
        >
          <span
            data-testid="customer_products__checkout-bottom-value"
          >
            Ver Carrinho: R$
            { totalValue }
          </span>
        </button>
      </div>
    </main>
  );
}

CustomerProducts.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default CustomerProducts;
