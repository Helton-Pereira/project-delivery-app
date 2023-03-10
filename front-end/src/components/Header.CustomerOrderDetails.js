import PropTypes from 'prop-types';
import api from '../services/requests';
import { ID_PAD_START } from '../utils/constants';
import conversions from '../utils/conversions';

function HeaderCustomerOrderDetails({ id, sellerName, status, saleDate, setOrder }) {
  const handleClickStatusOrder = async () => {
    await api.updateOrderStatus(`customer/orders/update/${id}`, { status: 'Entregue' });
    setOrder((prev) => ({ ...prev, status: 'Entregue' }));
  };

  return (
    <div key={ id }>

      <div>
        <div>
          <span>Pedido</span>
          <span
            data-testid="customer_order_details__element-order-details-label-order-id"
          >
            {id.toString().padStart(ID_PAD_START, '0')}
          </span>
        </div>

        <div>
          <span
            data-testid="customer_order_details__element-order-details-label-seller-name"
          >
            {sellerName}
          </span>
        </div>

        <div>
          <span
            data-testid="customer_order_details__element-order-details-label-order-date"
          >
            {conversions.convertDate(saleDate)}
          </span>
        </div>

        <div>
          <span
            data-testid={
              `customer_order_details__element-order-details-label-delivery-status-${id}`
            }
          >
            {status}
          </span>
        </div>

        <div>
          <button
            name="finish-button"
            data-testid="customer_order_details__button-delivery-check"
            type="button"
            disabled={ status !== 'Em Trânsito' }
            onClick={ handleClickStatusOrder }
          >
            Marcar como entregue
          </button>
        </div>

      </div>
      <br />

    </div>
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
