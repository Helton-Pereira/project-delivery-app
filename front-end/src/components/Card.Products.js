import PropTypes from 'prop-types';
import { useState } from 'react';

function CardProducts({ id, name, price, urlImage }) {
  const [quantity, setQuantity] = useState(0);

  const priceFloat = price.toFixed(Number(2));
  const priceString = priceFloat.toString();
  const priceProduct = priceString.replace(/\./, ',');

  //   localStorage.setItem("key","value");

  const increaseQuantity = () => { setQuantity(quantity + 1); };

  const decreaseQuantity = () => {
    if (quantity > 0) return setQuantity(quantity - 1);
  };

  const handleQuantityInput = ({ target }) => {
    const { value } = target;
    setQuantity(value);
  };

  return (
    <div key={ id }>

      <div>
        <span
          data-testid={ `customer_products__element-card-price-${id}` }
        >
          {`R$  ${priceProduct}`}
        </span>
      </div>

      <div>
        <img
          data-testid={ `customer_products__img-card-bg-image-${id}` }
          src={ urlImage }
          alt={ `Bebida:  ${name}` }
          style={ { width: '100px' } }
        />
      </div>

      <div>
        <span
          data-testid={ `customer_products__element-card-title-${id}` }
        >
          Name
          { name }
        </span>
      </div>

      <div>
        <button
          type="button"
          data-testid={ `customer_products__button-card-rm-item-${id}` }
          disabled={ false }
          onClick={ decreaseQuantity }
        >
          -
        </button>

        <input
          type="number"
          data-testid={ `customer_products__input-card-quantity-${id}` }
          value={ quantity }
          onChange={ handleQuantityInput }
          min={ 0 }
        />

        <button
          type="button"
          data-testid={ `customer_products__button-card-add-item-${id}` }
          onClick={ increaseQuantity }
        >
          +
        </button>
      </div>

    </div>
  );
}

CardProducts.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  urlImage: PropTypes.string.isRequired,
};

export default CardProducts;
