export function itemListReducer(state = {items: []}, action) {
    switch (action.type) {
        case "ITEM_LIST_REQUEST":
            return{loading: true}
        case "ITEM_LIST_SUCCESS":
            return{
                loading: false,
                items: action.payload
            }
        case "ITEM_LIST_FAIL":
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}

export function itemDetialsReducer (state = {item: {}}, action) {
    switch (action.type) {
        case "ITEM_DETAILS_REQUEST":
            return{loading: true}
        case "ITEM_DETAILS_SUCCESS":
            return{
                loading: false,
                item: action.payload
            }
        case "ITEM_DETAILS_FAIL":
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}