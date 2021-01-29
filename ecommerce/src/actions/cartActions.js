import axios from "axios";
import Cookie from 'js-cookie';

export const addToCart = (itemID, qty) => async (dispatch, getState) => {
    try{
        const {data} = await axios.get('/api/items/' + itemID);
        dispatch({type: "ADD_ITEM_TO_CART", payload:{
            id: data.id,
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