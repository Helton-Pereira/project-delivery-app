import PropTypes from 'prop-types';

function OrderHeaderSeller({ id, status, saleDate }) {
  const ID_PAD_START = 4;
  const DTID_STATUS = 'seller_order_details__element-order-details-label-delivery-status';

  function formatDate(dateOrder) {
    const date = new Date(dateOrder);
    return date.toLocaleDateString('pt-br');
  }

  const handleClickStatusOrder = async () => {
    // console.log('update order' + id);
    // await api.requestData('UPDATE / PATCH', 'Entregue');
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
            disabled={ status !== /Preparar Pedido/i }
            onClick={ handleClickStatusOrder }
          >
            Preparar Pedido
          </button>
        </div>
        <div>
          <button
            name="dispatch-check"
            data-testid="seller_order_details__button-dispatch-check"
            type="button"
            disabled={ status !== /Saiu para entrega/i }
            onClick={ handleClickStatusOrder }
          >
            Saiu para entrega
          </button>
        </div>
      </div>
      <br />
    </div>
  );
}
OrderHeaderSeller.propTypes = {
  id: PropTypes.number.isRequired,
  status: PropTypes.string.isRequired,
  saleDate: PropTypes.string.isRequired,
};
export default OrderHeaderSeller;
