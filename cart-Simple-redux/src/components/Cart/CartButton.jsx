import classes from './CartButton.module.css';
import { useSelector ,useDispatch } from 'react-redux'
import { layoutActions } from '../store/CartLayout';

const CartButton = () => {
  const items = useSelector((state)=> state.cartSlice.items)
  const itemsQuantity = useSelector((state)=> state.cartSlice.totalQuantity)

  const dispatch = useDispatch();
  const makeItVisible =()=>{
    dispatch(layoutActions.showLayout())
  }


  return (
    <button className={classes.button} onClick={makeItVisible}>
      <span>My Cart</span>
      <span className={classes.badge}>{itemsQuantity}</span>
    </button>
  );
};

export default CartButton;
