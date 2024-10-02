import Card from '../UI/Card';
import classes from './ProductItem.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { actionsCart } from '../store/CartSlice';
const ProductItem = ({item}) => {
  const dispatch = useDispatch() ;

  function addItem() {
    dispatch(actionsCart.addItemToCart(item))
  }

  return (
    <li className={classes.item}>
      <Card>
        <header>
          <h3>{item.title}</h3>
          <div className={classes.price}>${item.price.toFixed(2)}</div>
        </header>
        <p>{item.description}</p>
        <div className={classes.actions}>
          <button onClick={addItem}>Add to Cart</button>
        </div>
      </Card>
    </li>
  );
};

export default ProductItem;
