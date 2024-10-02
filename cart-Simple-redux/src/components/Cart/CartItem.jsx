import classes from './CartItem.module.css';
import { useDispatch } from 'react-redux' 
import { actionsCart } from '../store/CartSlice';


const CartItem = ({Item}) => {
  const dispatch = useDispatch();

  function increase(){
    dispatch(actionsCart.addItemToCart(Item))
  }


  function decrease(){
    dispatch(actionsCart.removeItemFromCart(Item))
  }


  return (
    <li className={classes.item}>
      <header>
        <h3>{Item.title}</h3>
        <div className={classes.price}>
          ${(Item.price * Item.quantity).toFixed(2)}{' '}
          <span className={classes.itemprice}>(${Item.price.toFixed(2)}/item)</span>
        </div>
      </header>
      <div className={classes.details}>
        <div className={classes.quantity}>
          x <span>{Item.quantity}</span>
        </div>
        <div className={classes.actions}>
          <button onClick={decrease}>-</button>
          <button onClick={increase}>+</button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
