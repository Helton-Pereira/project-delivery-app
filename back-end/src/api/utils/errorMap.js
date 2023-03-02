const errorMap = {
  INVALID_FIELDS: 400,
  INVALID_VALUES: 400,
  MISSING_FIELDS: 400,
  INVALID_TOKEN: 401,
  TOKEN_NOT_FOUND: 401,
  NOT_EXIST: 404,
  ALREADY_EXISTS: 409,
};

const mapError = (type) => errorMap[type] || 500;

module.exports = {
  errorMap,
  mapError,
};