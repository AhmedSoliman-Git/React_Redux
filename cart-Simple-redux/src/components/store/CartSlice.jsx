import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name:"cart-slice" ,
    initialState : { 
        items:[] ,
        totalPrice : 0 ,
        totalQuantity : 0
     } ,
    reducers: { 
        addItemToCart(state , action){
            const info  = action.payload ;
            const findItem = state.items.findIndex((item)=> item.id == info.id) ;
            
            if( findItem > -1 ){
                state.totalQuantity ++ ; 
                let updatedItem = {
                    ...info ,
                    quantity : state.items[findItem].quantity + 1 
                }
                state.items[findItem] = updatedItem ;
                state.totalPrice = state.totalPrice + state.items[findItem].price
            
            } else{
                // const findItem = state.items.findIndex((item)=> item.id == info.id) ;
                state.totalQuantity ++ ; 
                state.items.push({
                    ...info ,
                    quantity : 1
                })
                state.totalPrice = state.totalPrice + info.price
            }



            // const UpdatedItems = [...state.items] ;
            // if(findItem > -1){
            //     console.log(UpdatedItems)
            //     let updatedItem = {
            //         ...UpdatedItems[findItem] ,
            //         quantity : UpdatedItems[findItem].quantity + 1 
            //     }

            //     UpdatedItems[findItem] = updatedItem ;
            // }

            // else {
            //     UpdatedItems.push({
            //         ...action.payload,
            //         quantity : 1
            //     })
            // }

            // return {...state , items :UpdatedItems } ;
        } ,

        removeItemFromCart(state , action){

            const info  = action.payload ;
            const findItem = state.items.findIndex((item)=> item.id == info.id) ;
            
            if( findItem > -1 ){
                state.totalQuantity -- ; 
                let updatedItem = {
                    ...info ,
                    quantity : state.items[findItem].quantity - 1 
                }
                state.items[findItem] = updatedItem ;
                state.totalPrice = state.totalPrice - state.items[findItem].price
            } 

            if(state.items[findItem].quantity < 1){
                // state.totalPrice = state.totalPrice - state.items[findItem].price
                state.items.splice(findItem , 1) ;
            }


            
            // const findItem = state.items.findIndex((item)=> item.id == action.payload.id) ;
            // let UpdatedItems = [...state.items] ;

            // if(findItem > -1){

            //     let updatedItem = {
            //         ...UpdatedItems[findItem] ,
            //         quantity : UpdatedItems[findItem].quantity - 1 
            //     }
            //     UpdatedItems[findItem] = updatedItem ;
            // }
            // if(UpdatedItems[findItem].quantity < 1){
            //         console.log("Done")
            //         UpdatedItems.splice(findItem,1);
            // }

            // return {...state ,items :UpdatedItems }
        }


    }
})

export const actionsCart = cartSlice.actions ;

export default cartSlice.reducer ;