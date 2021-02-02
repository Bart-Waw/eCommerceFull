import axios from "axios";
import Cookie from 'js-cookie';

export const addToCart = (itemID, qty) => async (dispatch, getState) => {
    try{
        const {data} = await axios.get('/api/item/' + itemID);
        dispatch({type: "ADD_ITEM_TO_CART", payload:{
            _id: data._id,
            name: data.name,
            image: data.image,
            price: data.price,
            stock: data.stock,
            qty
        }});
        const { cart: { cartItems }} = getState();
        Cookie.set('cartItems', JSON.stringify(cartItems));
    }
    catch(error) {
        //
    }
}

export const removeFromCart = (itemID) => (dispatch, getState) => {
    try {
        dispatch({type: 'REMOVE_ITEM_FROM_CART', payload: itemID});
        const { cart: { cartItems }} = getState();
        Cookie.set('cartItems', JSON.stringify(cartItems));
    }
    catch(error) {
        //
    }
}

export const saveShipping = (data) => (dispatch) => {
    try{
        dispatch({type: "SAVE_SHIPPING", payload: data});
    }
    catch(error) {
        //
    }
}

export const savePayment = (data) => (dispatch) => {
    try{
        dispatch({type: "SAVE_PAYMENT", payload: data});
    }
    catch(error) {
        //
    }
}