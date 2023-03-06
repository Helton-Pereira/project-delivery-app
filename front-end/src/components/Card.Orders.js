import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function CardOrders({ history, id, status, saleDate, totalPrice }) {
  const { location: { pathname } } = history;
  const ID_PAD_START = 4;

  const convertPrice = (price) => price.toFixed(Number(2)).toString().replace(/\./, ',');

  return (
    <div key={ id } className="order-card-container">

      <Link
        to={ `${pathname}/${id}` }
        key={ id }
      >

        <div className="order-id-container">
          <span>Pedido</span>
          <span data-testid={ `customer_orders__element-order-id-${id}` }>
            {id.toString().padStart(ID_PAD_START, '0')}
          </span>
        </div>

        <div className="order-status-container">
          <span data-testid={ `customer_orders__element-delivery-status-${id}` }>
            {status}
          </span>
        </div>

        <div className="order-date-container">
          <span data-testid={ `customer_orders__element-order-date-${id}` }>
            {saleDate}
          </span>
        </div>

        <div className="order-price-container">
          <span data-testid={ `customer_orders__element-card-price-${id}` }>
            {`R$ ${convertPrice(totalPrice)}`}
          </span>
        </div>

      </Link>

      <br />
      {/* Elemento acima somente para facilitar a visualização. Apagamos ele durante a estilização. */}

    </div>
  );
}

CardOrders.propTypes = {
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  id: PropTypes.number.isRequired,
  status: PropTypes.string.isRequired,
  saleDate: PropTypes.string.isRequired,
  totalPrice: PropTypes.number.isRequired,
};

export default CardOrders;
