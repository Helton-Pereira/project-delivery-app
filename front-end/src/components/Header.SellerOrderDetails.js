import PropTypes from 'prop-types';
import api from '../services/requests';
import { ID_PAD_START, statusColors } from '../utils/constants';
import conversions from '../utils/conversions';

function HeaderSellerOrderDetails({ id, status, saleDate, setOrder }) {
  const DTID_STATUS = 'seller_order_details__element-order-details-label-delivery-status';

  const handleClickStatusOrder = async (newStatus) => {
    await api.updateOrderStatus(`seller/orders/update/${id}`, { status: newStatus });
    setOrder((prev) => ({ ...prev, status: newStatus }));
  };

  return (
    <section key={ id } className="seller-order-details-header">

      <span
        className="seller-order-details-id"
        data-testid="seller_order_details__element-order-details-label-order-id"
      >
        {`Pedido ${id.toString().padStart(ID_PAD_START, '0')}`}
      </span>

      <span
        className="seller-order-details-date"
        data-testid="seller_order_details__element-order-details-label-order-date"
      >
        {conversions.convertDate(saleDate)}
      </span>

      <span
        className="seller-order-details-status"
        style={ { backgroundColor: `${statusColors[status] || '#056CF9'}` } }
        data-testid={ DTID_STATUS }
      >
        {status}
      </span>

      <button
        className="seller-order-details-preparing-button"
        name="preparing-check"
        data-testid="seller_order_details__button-preparing-check"
        type="button"
        disabled={ status !== 'Pendente' }
        onClick={ () => handleClickStatusOrder('Preparando') }
      >
        Preparar Pedido
      </button>

      <button
        className="seller-order-details-dispatch-button"
        name="dispatch-check"
        data-testid="seller_order_details__button-dispatch-check"
        type="button"
        disabled={ status !== 'Preparando' }
        onClick={ () => handleClickStatusOrder('Em Trânsito') }
      >
        Saiu para entrega
      </button>

    </section>
  );
}
HeaderSellerOrderDetails.propTypes = {
  id: PropTypes.number.isRequired,
  status: PropTypes.string.isRequired,
  saleDate: PropTypes.string.isRequired,
  setOrder: PropTypes.func.isRequired,
};
export default HeaderSellerOrderDetails;
