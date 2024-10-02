import { createSlice } from "@reduxjs/toolkit";

const cartSliceLayout = createSlice({
    name : "cart-layout" ,
    initialState  : {isVisible : false} ,
    reducers : {
        showLayout(state){
            state.isVisible = !state.isVisible ;
        }
    }
})

export const layoutActions = cartSliceLayout.actions ;
export default cartSliceLayout.reducer ;