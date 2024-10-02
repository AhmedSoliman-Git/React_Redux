import { configureStore } from "@reduxjs/toolkit";
import cartSliceReducer from './CartSlice' ;
import layoutReducer from './CartLayout'
const store = configureStore({reducer:{ cartSlice : cartSliceReducer , cartLayout :layoutReducer }})

export default store ;