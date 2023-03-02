// import NavbarCustomer from '../components/Navbar.Custumer';
import TableOrder from '../components/TableOrder';

function CostumerCheckout() {
  // const INITIAL_STATE = {
  //   email: '',
  //   password: '',
  // };
  // const [user, setUser] = useState(INITIAL_STATE);
  // const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(true);
  // const [errorMessage, setErrorMessage] = useState('');
  // // const { userDispatch } = useContext(DeliveryAppContext);

  // const handleChanges = ({ target }) => {
  //   const { name, value } = target;
  //   setUser((prevUser) => ({
  //     ...prevUser,
  //     [name]: value,
  //   }));
  // };

  // const handleLogin = async (event) => {
  //   event.preventDefault();
  //   const { history } = props;

  //   try {
  //     const { token } = await requestLogin('/login', user);
  //     console.log(token);
  //     // userDispatch({ type: 'LOGIN', payload: email });
  //     setErrorMessage('');
  //     history.push('/customer/products');
  //   } catch (error) {
  //     console.log(error.response.data.message);
  //     setErrorMessage(error.response.data.message);
  //   }
  // };

  // const handleRegisterButton = async (event) => {
  //   event.preventDefault();
  //   const { history } = props;
  //   history.push('/register');
  // };

  // useEffect(() => {
  //   const verifyLoginRequest = () => {
  //     const { email, password } = user;
  //     if (isValidEmail(email) && password.length >= MIN_PASSWORD_LENGTH) {
  //       setIsLoginButtonDisabled(false);
  //     } else {
  //       setIsLoginButtonDisabled(true);
  //     }
  //   };
  //   verifyLoginRequest();
  // }, [user]);

  return (
    <main>
      <h1>Checkout-Page</h1>
      {/* <NavbarCustomer /> */}
      <h2>NavbarCustomer</h2>
      <div className="Checkout-container">
        <h2>Finalizar Pedido</h2>
        <TableOrder />
        <div>
          <h2>Detalhes e Endereço para Entrega</h2>
        </div>
      </div>
    </main>
  );
}

// CostumerCheckout.propTypes = {
//   history: PropTypes.shape({
//     push: PropTypes.func.isRequired,
//   }).isRequired,
// };

export default CostumerCheckout;
