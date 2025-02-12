import Card from '../UI/Card';
import classes from './Cart.module.css';
import CartItem from './CartItem';
import { useSelector } from 'react-redux'

const Cart = (props) => {
  const ItemsInCart = useSelector((state)=>state.cartSlice.items) ;

    return <Card className={classes.cart}>
    <h2>Your Shopping Cart</h2>
    <ul>
      {ItemsInCart.map((item,itemIndex)=>{
        return <CartItem key={itemIndex} Item={item}/>
      })}
    </ul>
  </Card>

  }



export default Cart;
