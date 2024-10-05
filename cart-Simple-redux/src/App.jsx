import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import Notification from './components/UI/Notification';
// import {layoutActions} from './components/store/CartLayout'
import { actionsCart, sendCartData,fetchedData } from './components/store/CartSlice'
let initial = true;  // here we write this out of component to not execute again

function App() {
  const cartItems = useSelector((state)=>state.cartSlice)
  const dispatch = useDispatch();
  const notification = useSelector((state) => state.cartLayout.notification) ;


  useEffect(()=>{
      dispatch(fetchedData())
  
  },[])

  useEffect(()=>{
      if(initial) {
        initial = false ;
        return ;
      }
      if(cartItems.starter){ 
        dispatch(sendCartData({
          // here we destructure the (cartItems) because we want to avoid writing 
         //strater property in FireBase
         items :cartItems.items ,
         totalPrice : cartItems.totalPrice ,
         totalQuantity : cartItems.totalQuantity
       }));
      }



    //   dispatch(layoutActions.notificationHandle({
    //     status : 'pending' ,
    //     title : 'Sending ...' ,
    //     message : 'Waiting Data'
    //   }))



    //   const response = await fetch('https://rest-api-90502-default-rtdb.firebaseio.com/cart.json',{
    //     method:"PUT",
    //     body:JSON.stringify(cartItems)
    //   })

    //   dispatch(layoutActions.notificationHandle({
    //     status : 'success' ,
    //     title : 'Success Process' ,
    //     message : 'Successfully getting Data'
    //   }))



    //   if(!response.ok) {
    //     throw new Error("Failed to Fetch Data")
    //   }
    // }

    // sendDate().catch((error)=>{ // here we can use catch because this function reurns a promise
    //   dispatch(layoutActions.notificationHandle({
    //     status : 'error' ,
    //     title : 'Error Ocurred' ,
    //     message : 'Failed to Fetch Data'
    //   }))

    // })
}
  , [cartItems,dispatch])

  const isVisible = useSelector((state) =>state.cartLayout.isVisible) ;

  return (
    <>
    <Notification status={notification.status} title={notification.title} message={notification.message} />
    <Layout>
      {isVisible && <Cart />}
      <Products />
    </Layout>
    </>
  );
}

export default App;
