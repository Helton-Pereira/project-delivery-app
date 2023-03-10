import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import conversions from '../utils/conversions';

function CardCustomerOrder({ history, id, status, saleDate, totalPrice }) {
  const { location: { pathname } } = history;

  return (
    <div key={ id } className="order-card-container">

      <Link
        to={ `${pathname}/${id}` }
        key={ id }
      >

        <div className="order-id-container">
          <span>Pedido</span>
          <span data-testid={ `customer_orders__element-order-id-${id}` }>
            {conversions.convertId(id)}
          </span>
        </div>

        <div className="order-status-container">
          <span data-testid={ `customer_orders__element-delivery-status-${id}` }>
            {status}
          </span>
        </div>

        <div className="order-date-container">
          <span data-testid={ `customer_orders__element-order-date-${id}` }>
            {conversions.convertDate(saleDate)}
          </span>
        </div>

        <div className="order-price-container">
          <span data-testid={ `customer_orders__element-card-price-${id}` }>
            {`R$ ${conversions.convertPrice(totalPrice)}`}
          </span>
        </div>

      </Link>

      <br />
      {/* Elemento acima somente para facilitar a visualização. Apagamos ele durante a estilização. */}

    </div>
  );
}

CardCustomerOrder.propTypes = {
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

export default CardCustomerOrder;
