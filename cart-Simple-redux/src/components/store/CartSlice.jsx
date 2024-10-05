import { createSlice } from "@reduxjs/toolkit";
import {layoutActions} from './CartLayout'

const cartSlice = createSlice({
    name:"cart-slice" ,
    initialState : { 
        starter : false,
        items:[] ,
        totalPrice : 0 ,
        totalQuantity : 0
     } ,
    reducers: { 

        replaceData(state , action){
            state.items = action.payload.items ;
            state.totalPrice = action.payload.totalPrice;
            state.totalQuantity = action.payload.totalQuantity ;
        },

        addItemToCart(state , action){
            const info  = action.payload ;
            const findItem = state.items.findIndex((item)=> item.id == info.id) ;
            state.starter = true ;
            if( findItem > -1 ){
                state.totalQuantity ++ ; 
                let updatedItem = {
                    ...info ,
                    quantity : state.items[findItem].quantity + 1 
                }
                state.items[findItem] = updatedItem ;
                state.totalPrice = state.totalPrice + state.items[findItem].price
            
            } else{
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
            state.starter = true ;
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
            //         UpdatedItems.splice(findItem,1);
            // }

            // return {...state ,items :UpdatedItems }
        }
    }
}
)

export function sendCartData(cartItems){
    return async (dispatch)=>{

        dispatch(layoutActions.notificationHandle({
            status : 'pending' ,
            title : 'Sending ...' ,
            message : 'Waiting Data!'
        }))

        
        const sendData = async()=>{
            const response = await fetch('https://rest-api-90502-default-rtdb.firebaseio.com/cart.json',{
                method:"PUT",
                body:JSON.stringify(cartItems)
            })

            if(!response.ok) {
                throw new Error("Failed to Get Data")
            }
        }

            try{
                await sendData();

                dispatch(layoutActions.notificationHandle({
                    status : 'success' ,
                    title : 'Success Process' ,
                    message : 'Successfully getting Data'
                }))

            }catch(error){
                dispatch(layoutActions.notificationHandle({
                    status : 'error' ,
                    title : 'Error Ocurred' ,
                    message : 'Failed to Fetch Data'
                }))
            }
    }
}


export const fetchedData =()=> {
    return async (dispatch)=>{

        async function getData(){
            const response = await fetch('https://rest-api-90502-default-rtdb.firebaseio.com/cart.json') ;
            const data = await response.json() ;
        
            if(!response.ok) throw new Error('Failed To Fetch Data') ;
        
            return data ;
        } 
    
        try {
            const finalData = await getData() ; 
            dispatch(actionsCart.replaceData({ // here we could write finalData 
                // but when we call items from Firebase before it will be undefined not empty array 
                //means how you want to get items from not items in it
                // so we make that to make an initial value for it 
                items : finalData.items || [] ,
                totalQuantity : finalData.totalQuantity ,
                totalPrice : finalData.totalPrice

            }))
        }
        catch(error){ 
            dispatch(layoutActions.notificationHandle({
                status : 'error' ,
                title : 'Error Ocurred' ,
                message : 'Failed to Fetch Data'
            }))
        }
    }
}

export const actionsCart = cartSlice.actions ;

export default cartSlice.reducer ;