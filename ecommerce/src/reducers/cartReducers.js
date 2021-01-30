export function cartReducer(state = {cartItems: []}, action) {
    switch (action.type) {
        case "ADD_ITEM_TO_CART":
            const item = action.payload;
            const itemAlreadyInCart = state.cartItems.find(x => x._id === item._id)
            if (itemAlreadyInCart) {
                console.log(item.qty);
                console.log(itemAlreadyInCart.qty);

                item.qty = item.qty + itemAlreadyInCart.qty;
                return {cartItems:
                    state.cartItems.map(x => x._id === itemAlreadyInCart._id ? item : x)
                }
            }
            return {
                cartItems: [...state.cartItems, item]
            }
        default:
            return state
    }
}