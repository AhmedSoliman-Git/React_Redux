import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';

function App() {
  const cartItems = useSelector((state)=>state.cartSlice)

  useEffect(()=>{
    fetch('https://rest-api-90502-default-rtdb.firebaseio.com/cart.json',{
      method:"PUT",
      body:JSON.stringify(cartItems)
    })
  }  , [cartItems])

  const isVisible = useSelector((state) =>state.cartLayout.isVisible) ;

  return (
    <Layout>
       {isVisible && <Cart />}
      <Products />
    </Layout>
  );
}

export default App;
