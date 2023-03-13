import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import conversions from '../utils/conversions';
import { statusColors } from '../utils/constants';

function CardCustomerOrder({ history, id, status, saleDate, totalPrice }) {
  const { location: { pathname } } = history;

  return (
    <Link
      to={ `${pathname}/${id}` }
      key={ id }
      className="customer-order-card-container"
    >
      <div className="customer-order-id-container">
        <span>Pedido</span>
        <span data-testid={ `customer_orders__element-order-id-${id}` }>
          {conversions.convertId(id)}
        </span>
      </div>

      <div
        className="customer-order-status-container"
        style={ { backgroundColor: `${statusColors[status]}` } }
      >
        <span data-testid={ `customer_orders__element-delivery-status-${id}` }>
          {status}
        </span>
      </div>

      <section className="customer-order-date-price-container">
        <div>
          <span data-testid={ `customer_orders__element-order-date-${id}` }>
            {conversions.convertDate(saleDate)}
          </span>
        </div>

        <div>
          <span data-testid={ `customer_orders__element-card-price-${id}` }>
            {`R$ ${conversions.convertPrice(totalPrice)}`}
          </span>
        </div>
      </section>

    </Link>
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
