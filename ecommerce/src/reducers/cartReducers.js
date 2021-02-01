export function cartReducer(state = {cartItems: [], shipping: {}, payment: {}}, action) {
    switch (action.type) {
        case "ADD_ITEM_TO_CART":
            const item = action.payload;
            const itemAlreadyInCart = state.cartItems.find(x => x._id === item._id)
            if (itemAlreadyInCart) {
                return {cartItems:
                    state.cartItems.map(x => x._id === itemAlreadyInCart._id ? item : x)
                }
            }
            return {
                cartItems: [...state.cartItems, item]
            }
        case 'REMOVE_ITEM_FROM_CART':
            
            const itemToDelete = state.cartItems.findIndex(x => x._id === action.payload);
            let newCart = state.cartItems;
            newCart.splice(itemToDelete, 1);
            return {cartItems: newCart};
        case 'SAVE_SHIPPING':
            return {...state, shipping: action.payload}
        case "SAVE_PAYMENT":
            return {...state, payment: action.payload}
        default:
            return state
    }
}