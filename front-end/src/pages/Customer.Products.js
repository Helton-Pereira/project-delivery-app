// import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import CardProducts from '../components/Card.Products';
import NavBarCustomer from '../components/NavBar.Customer';
// import { requestData } from '../services/requests';
import mockProducts from './mockProducts';

function CustomerProducts(props) {
  // const [products, setProducts] = useState([]);

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

  // useEffect(() => {
  //   const getProducts = async () => {
  //     const { data } = await requestData('/customer/products');
  //     console.log(data);
  //     setProducts(data);
  //   };
  //   getProducts();
  // }, []);

  return (
    <main>
      <NavBarCustomer />

      {mockProducts.map((product) => (
        <CardProducts
          key={ product.id }
          name={ product.name }
          price={ product.price }
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
