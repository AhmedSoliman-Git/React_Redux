import { createSlice } from "@reduxjs/toolkit";

const cartSliceLayout = createSlice({
    name : "cart-layout" ,
    initialState  : {isVisible : false ,notification : {}} ,
    reducers : {
        showLayout(state){
            state.isVisible = !state.isVisible ;
        } ,
        notificationHandle(state,action){
            state.notification = {
                status: action.payload.status ,
                title : action.payload.title ,
                message : action.payload.message
            }
        }
    }
})

export const layoutActions = cartSliceLayout.actions ;
export default cartSliceLayout.reducer ;