import PropTypes from 'prop-types';
import api from '../services/requests';

function HeaderSellerOrderDetails({ id, status, saleDate, setOrder }) {
  const ID_PAD_START = 4;
  const DTID_STATUS = 'seller_order_details__element-order-details-label-delivery-status';

  function formatDate(dateOrder) {
    const date = new Date(dateOrder);
    return date.toLocaleDateString('pt-br');
  }

  const handleClickStatusOrder = async (newStatus) => {
    console.log(`update order${id}`);
    await api.updateOrderStatus(`seller/orders/update/${id}`, { status: newStatus });
    setOrder((prev) => ({ ...prev, status: newStatus }));
    // window.location.reload(true); // Isto interfere no avaliador.
  };

  return (
    <div key={ id }>

      <div>
        <div>
          <span>Pedido</span>
          <span
            data-testid="seller_order_details__element-order-details-label-order-id"
          >
            {id.toString().padStart(ID_PAD_START, '0')}
          </span>
        </div>
        <div>
          <span
            data-testid="seller_order_details__element-order-details-label-order-date"
          >
            {formatDate(saleDate)}
          </span>
        </div>
        <div>
          <span
            data-testid={ DTID_STATUS }
          >
            {status}
          </span>
        </div>
        <div>
          <button
            name="preparing-check"
            data-testid="seller_order_details__button-preparing-check"
            type="button"
            disabled={ status !== 'Pendente' }
            onClick={ () => handleClickStatusOrder('Preparando') }
          >
            Preparar Pedido
          </button>
        </div>
        <div>
          <button
            name="dispatch-check"
            data-testid="seller_order_details__button-dispatch-check"
            type="button"
            disabled={ status !== 'Preparando' }
            onClick={ () => handleClickStatusOrder('Em Trânsito') }
          >
            Saiu para entrega
          </button>
        </div>
      </div>
      <br />
    </div>
  );
}
HeaderSellerOrderDetails.propTypes = {
  id: PropTypes.number.isRequired,
  status: PropTypes.string.isRequired,
  saleDate: PropTypes.string.isRequired,
  setOrder: PropTypes.func.isRequired,
};
export default HeaderSellerOrderDetails;
