import PropTypes from 'prop-types';

function orderHeader({ id, sellerName, status, saleDate }) {
  const ID_PAD_START = 4;

  // const convertPrice = (price) => price.toFixed(Number(2)).toString().replace(/\./, ',');
  function formatDate(dateOrder) {
    const date = new Date(dateOrder);
    return date.toLocaleDateString('pt-br');
  }

  const handleClickStatusOrder = async () => {
    // console.log('update order' + id);
    // await api.requestData('UPDATE / PATCH', '{ STATUS: Entregue }'); // FALTA APENAS A ROTA DE UPDATE DO STATUS DA ORDER.
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
            {formatDate(saleDate)}
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
            disabled={ status !== /Em Trânsito/i }
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

orderHeader.propTypes = {
  id: PropTypes.number.isRequired,
  sellerName: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  saleDate: PropTypes.string.isRequired,
  totalPrice: PropTypes.number.isRequired,
};

export default orderHeader;
