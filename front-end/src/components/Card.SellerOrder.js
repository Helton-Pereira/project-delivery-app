import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import conversions from '../utils/conversions';
import { ID_PAD_START, statusColors } from '../utils/constants';

function CardSellerOrder({
  history, id, status, saleDate, totalPrice, deliveryAddress, deliveryNumber }) {
  const { location: { pathname } } = history;

  return (
    <Link
      to={ `${pathname}/${id}` }
      key={ id }
      className="seller-order-card-container"
    >

      <div className="seller-order-id-container">
        <span>Pedido</span>
        <span data-testid={ `seller_orders__element-order-id-${id}` }>
          {id.toString().padStart(ID_PAD_START, '0')}
        </span>
      </div>

      <div
        className="seller-order-status-container"
        style={ { backgroundColor: `${statusColors[status]}` } }
      >
        <span data-testid={ `seller_orders__element-delivery-status-${id}` }>
          {status}
        </span>
      </div>

      <section className="seller-order-date-price-address">
        <div className="seller-order-date-container">
          <span data-testid={ `seller_orders__element-order-date-${id}` }>
            {conversions.convertDate(saleDate)}
          </span>
        </div>

        <div className="seller-order-price-container">
          <span data-testid={ `seller_orders__element-card-price-${id}` }>
            {`R$ ${conversions.convertPrice(totalPrice)}`}
          </span>
        </div>

        <div className="seller-order-address-container">
          <span data-testid={ `seller_orders__element-card-address-${id}` }>
            {`${deliveryAddress}, ${deliveryNumber}`}
          </span>
        </div>
      </section>

    </Link>
  );
}

CardSellerOrder.propTypes = {
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  id: PropTypes.number.isRequired,
  status: PropTypes.string.isRequired,
  saleDate: PropTypes.string.isRequired,
  totalPrice: PropTypes.number.isRequired,
  deliveryAddress: PropTypes.string.isRequired,
  deliveryNumber: PropTypes.string.isRequired,
};

export default CardSellerOrder;
