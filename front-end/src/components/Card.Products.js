import PropTypes from 'prop-types';
import { useState } from 'react';

function CardProducts({ id, name, price, urlImage }) {
  const [quantity, setQuantity] = useState(0);

  const increaseQuantity = () => { setQuantity(quantity + 1); };
  const decreaseQuantity = () => { setQuantity(quantity + 1); };

  return (
    <div key={ id }>

      <div>
        <span
          data-testid={ `customer_products__element-card-price-${id}` }
        >
          Price
          {`R$  ${price.replace('.', ',')}`}
        </span>
      </div>

      <div>
        <img
          data-testid={ `customer_products__img-card-bg-image-${id}` }
          src={ urlImage }
          alt={ name }
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
          // onChange={ target }
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
  price: PropTypes.string.isRequired,
  urlImage: PropTypes.string.isRequired,
};

export default CardProducts;
