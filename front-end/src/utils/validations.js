export default isValidEmail = (inputEmail) => String(inputEmail).toLowerCase().match(/^[^ ]+@[^ ]+\.[a-z]{2,3}$/);
