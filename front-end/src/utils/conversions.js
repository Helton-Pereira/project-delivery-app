const ID_PAD_START = 4;
const DATE_PAD_START = 2;

const convertId = (id) => {
  const convertedId = id.toString();
  return convertedId.padStart(ID_PAD_START, '0');
};

const convertPrice = (price) => {
  const fixedPrice = price.toFixed(Number(2));
  const convertedPrice = fixedPrice.toString();
  return convertedPrice.replace(/\./, ',');
};

const convertDate = (date) => {
  const convertedDate = new Date(date);
  const day = convertedDate.getDate().toString().padStart(DATE_PAD_START, '0');
  const month = (convertedDate.getMonth() + 1).toString().padStart(DATE_PAD_START, '0');
  const year = convertedDate.getFullYear().toString();
  return `${day}/${month}/${year}`;
};

export default { convertId, convertPrice, convertDate };
