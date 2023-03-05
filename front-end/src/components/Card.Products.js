import PropTypes from 'prop-types';
import { useState, useEffect, useContext } from 'react';
import DeliveryAppContext from '../context/DeliveryAppContext';

function CardProducts({ id, name, price, urlImage }) {
  const [quantity, setQuantity] = useState(0);

  const priceFloat = price.toFixed(Number(2));
  const priceString = priceFloat.toString();
  const priceProduct = priceString.replace(/\./, ',');
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
    // const storage = browserStorage.get('cart') || [];
    if (quantity === 0) {
      const newCart = [...cart, { id, name, price, quantity: 1 }];
      // storage.push({ id, name, price, quantity: 1 });
      setCart(newCart);
    } else {
      const newCart = updateQuantityItem(value);
      // item.quantity = quantity + increase;
      setCart(newCart);
    }
  };

  const decreaseQuantity = (decrease) => {
    const value = !quantity ? 0 : quantity - decrease;
    setQuantity(value);
    if (quantity) {
      // let storage = browserStorage.get('cart') || [];
      // const item = storage.find((items) => items.id === id);
      if (quantity > 1) {
        const newCart = updateQuantityItem(value);
        setCart(newCart);
      } else {
        // storage = storage.filter((items) => items.id !== id);
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
          onClick={ () => decreaseQuantity(1) }
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
          onClick={ () => increaseQuantity(1) }
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
