import ProductItem from './ProductItem';
import classes from './Products.module.css';
import {useSelector} from 'react-redux';

const Products = (props) => {
  const Items2 = [ 
    {
      id:1,
      title : "Test C1" ,
      price : 10 ,
      description : "best of us 1",
    } ,
    {
      id:2,
      title : "Test C2" ,
      price : 15 ,
      description : "best of us 2"
    } ,
]

const Items = useSelector( (state)=> state.cartSlice.items); 


  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>

        {Items2.map((item,itemIndex)=>{
          return <ProductItem key={itemIndex} item={item} />
        })}


      </ul>
    </section>
  );
};

export default Products;
