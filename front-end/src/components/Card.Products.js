import PropTypes from 'prop-types';
import { useState, useEffect, useContext } from 'react';
import DeliveryAppContext from '../context/DeliveryAppContext';
import conversions from '../utils/conversions';

function CardProducts({ id, name, price, urlImage }) {
  const [quantity, setQuantity] = useState(0);

  const { cart, setCart } = useContext(DeliveryAppContext);

  useEffect(() => {
    const item = cart.find((items) => items.id === id);
    if (item) setQuantity(item.quantity);
    else setQuantity(0);
  }, []);

  const updateQuantityItem = (newQty) => cart
    .map((items) => (items.id === id
      ? Object.assign(items, { ...items, quantity: newQty })
      : items));

  const increaseQuantity = (increase) => {
    const value = quantity + increase;
    setQuantity(value);
    if (quantity === 0) {
      const newCart = [...cart, { id, name, price, quantity: 1 }];
      setCart(newCart);
    } else {
      const newCart = updateQuantityItem(value);
      setCart(newCart);
    }
  };

  const decreaseQuantity = (decrease) => {
    const value = !quantity ? 0 : quantity - decrease;
    setQuantity(value);
    if (quantity) {
      if (quantity > 1) {
        const newCart = updateQuantityItem(value);
        setCart(newCart);
      } else {
        const newCart = cart.filter((items) => items.id !== id);
        setCart(newCart);
      }
    }
  };

  const handleQuantityInput = ({ target }) => {
    const { value } = target;
    const convertedValue = Number(value);
    setQuantity(convertedValue);
    const item = cart.find((items) => items.id === id);

    if (!item) {
      const newCart = [...cart, { id, name, price, quantity: convertedValue }];
      setCart(newCart);
    } else if (convertedValue >= 1) {
      const newCart = updateQuantityItem(convertedValue);
      setCart(newCart);
    } else {
      const newCart = cart.filter((items) => items.id !== id);
      setCart(newCart);
    }
  };

  return (
    <section key={ id } className="product-card">

      <span
        className="product-price"
        data-testid={ `customer_products__element-card-price-${id}` }
      >
        {`R$  ${conversions.convertPrice(price)}`}
      </span>

      <img
        data-testid={ `customer_products__img-card-bg-image-${id}` }
        src={ urlImage }
        alt={ `Bebida:  ${name}` }
      />

      <span
        className="product-name"
        data-testid={ `customer_products__element-card-title-${id}` }
      >
        { name }
      </span>

      <div className="product-quantity">
        <button
          type="button"
          className="btn btn-primary"
          data-testid={ `customer_products__button-card-rm-item-${id}` }
          disabled={ false }
          onClick={ () => decreaseQuantity(1) }
        >
          -
        </button>

        <input
          type="number"
          className="form-control"
          data-testid={ `customer_products__input-card-quantity-${id}` }
          value={ quantity }
          onChange={ handleQuantityInput }
          min={ 0 }
        />

        <button
          type="button"
          className="btn btn-primary"
          data-testid={ `customer_products__button-card-add-item-${id}` }
          onClick={ () => increaseQuantity(1) }
        >
          +
        </button>
      </div>

    </section>
  );
}

CardProducts.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  urlImage: PropTypes.string.isRequired,
};

export default CardProducts;
