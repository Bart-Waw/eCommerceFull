export function cartReducer(state = {cartItems: []}, action) {
    switch (action.type) {
        case "ADD_ITEM_TO_CART":
            const item = action.payload;
            const itemAlreadyInCart = state.cartItems.find(x => x.id === item.id)
            if (itemAlreadyInCart) {
                console.log(item.qty);
                console.log(itemAlreadyInCart.qty);

                item.qty = item.qty + itemAlreadyInCart.qty;
                return {cartItems:
                    state.cartItems.map(x => x.id === itemAlreadyInCart.id ? item : x)
                }
            }
            return {
                cartItems: [...state.cartItems, item]
            }
        default:
            return state
    }
}