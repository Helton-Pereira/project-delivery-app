import PropTypes from 'prop-types';
import api from '../services/requests';
import { ID_PAD_START, statusColors } from '../utils/constants';
import conversions from '../utils/conversions';

function HeaderCustomerOrderDetails({ id, sellerName, status, saleDate, setOrder }) {
  const handleClickStatusOrder = async () => {
    await api.updateOrderStatus(`customer/orders/update/${id}`, { status: 'Entregue' });
    setOrder((prev) => ({ ...prev, status: 'Entregue' }));
  };

  return (
    <section key={ id } className="customer-order-details-header">

      <span
        className="customer-order-details-id"
        data-testid="customer_order_details__element-order-details-label-order-id"
      >
        {`Pedido ${id.toString().padStart(ID_PAD_START, '0')}`}
      </span>

      <div className="customer-order-details-seller">
        <span>Pessoa Vendedora: </span>
        <span
          className="seller-name"
          data-testid="customer_order_details__element-order-details-label-seller-name"
        >
          {sellerName}
        </span>
      </div>

      <span
        className="customer-order-details-date"
        data-testid="customer_order_details__element-order-details-label-order-date"
      >
        {conversions.convertDate(saleDate)}
      </span>

      <span
        className="customer-order-details-status"
        style={ { backgroundColor: `${statusColors[status] || '#056CF9'}` } }
        data-testid={
          `customer_order_details__element-order-details-label-delivery-status-${id}`
        }
      >
        {status}
      </span>

      <button
        className="customer-order-details-finish-button"
        name="finish-button"
        data-testid="customer_order_details__button-delivery-check"
        type="button"
        disabled={ status !== 'Em Trânsito' }
        onClick={ handleClickStatusOrder }
      >
        Marcar como entregue
      </button>

    </section>
  );
}

HeaderCustomerOrderDetails.propTypes = {
  id: PropTypes.number.isRequired,
  sellerName: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  saleDate: PropTypes.string.isRequired,
  setOrder: PropTypes.func.isRequired,
};

export default HeaderCustomerOrderDetails;
