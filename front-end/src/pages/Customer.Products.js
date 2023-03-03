import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import CardProducts from '../components/Card.Products';
import NavBarCustomer from '../components/NavBar.Customer';
import api from '../services/requests';
import mockProducts from './mockProducts';
import useValidateAuth from '../hooks/useValidateAuth';
import usePersistState from '../hooks/usePersistState';
import initialStates from '../utils/initialStates';

function CustomerProducts(props) {
  const [products, setProducts] = useState([]);
  const [user, setUser] = usePersistState('user', initialStates.userData);
  const [auth, setAuth] = useState(false);

  useValidateAuth(props, setAuth, setUser);

  // Testando sem o localStorage
  const cartProducts = [{ price: 2.20, quantity: 2 }, { price: 2.49, quantity: 4 }]; // mock
  const totalCalculate = cartProducts.map((prod) => prod.price * prod.quantity);
  const initialValue = 0;
  const total = totalCalculate.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    initialValue,
  );
  const totalFloat = total.toFixed(Number(2));
  const totalString = totalFloat.toString();
  const totalProduct = totalString.replace(/\./, ',');
  // ---------

  const handleClickCart = (event) => {
    event.preventDefault();
    const { history } = props;
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

      {products.map((product) => (
        <CardProducts
          key={ product.id }
          name={ product.name }
          price={ Number(product.price) }
          image={ product.urlImage }
          id={ product.id }
        />
      ))}

      <div>
        <button
          type="button"
          data-testid="customer_products__button-cart"
          className="button-cart"
          disabled={ totalProduct < 1 }
          onClick={ handleClickCart }
        >
          <span
            data-testid="customer_products__checkout-bottom-value"
          >
            { `Ver carrinho: ${totalProduct}` }
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
