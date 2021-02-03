export function placeOrderReducer (state = {}, action) {
    switch (action.type) {
        case "ORDER_PLACE_REQUEST":
            return{loading: true}
        case "ORDER_PLACE_SUCCESS":
            return{
                loading: false,
                userInfo: action.payload
            }
        case "ORDER_PLACE_FAIL":
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}

export function orderListReducer (state = {orders: []}, action) {
    switch (action.type) {
        case "ORDER_LIST_REQUEST":
            return{loading: true, orders: [] }
        case "ORDER_LIST_SUCCESS":
            return{
                loading: false,
                orders: action.payload
            }
        case "ORDER_LIST_FAIL":
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}