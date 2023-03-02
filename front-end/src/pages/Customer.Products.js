import { useState } from 'react';
import CardProducts from '../components/Card.Products';
import NavBarCustomer from '../components/NavBar.Customer';

function CustomerProducts() {
  // const [products, setProducts] = useState([]);
  const [products] = useState([]);

  // const user = localStorage.getItem('user');

  return (
    <>
      <NavBarCustomer />
      {/* <NavBarCustomer name={ JSON.parse(user).name } /> */}
      {/* <CardProducts /> */}
      {products.map((product) => (
        <CardProducts
          key={ product.id }
          name={ product.name }
          price={ product.price }
          image={ product.urlImage }
          id={ product.id }
        />
      ))}
    </>
  );
}

export default CustomerProducts;
