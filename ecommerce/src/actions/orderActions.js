import axios from "axios";

export const placeOrder = (userID, items, address, city, postcode, country, paymentMethod, price) => async (dispatch) => {
    dispatch({type: 'ORDER_PLACE_REQUEST', payload: {userID, items, address, city, postcode, country, paymentMethod, price}});
    try{
        const {data} = await axios.post('./api/orders/placeOrder', {userID, items, address, city, postcode, country, paymentMethod, price});
        dispatch({type: 'ORDER_PLACE_SUCCESS', payload: data});
    }
    catch (error) {
        dispatch({type: 'ORDER_PLACE_FAIL', payload: error.msg});
    }
}

export const listOrders = (id) => async (dispatch, getState) => {
    try {
        const { userLogin: {userInfo}} = getState();
        dispatch({type: 'ORDER_LIST_REQUEST'});
        if (userInfo.name === 'Admin') {
            const {data} = await axios.get('/api/orders', {headers: {
                'Authorization': 'Bearer ' + userInfo.token
            }});
            dispatch({type: 'ORDER_LIST_SUCCESS', payload: data});
        }
        else {
            const {data} = await axios.get('/api/orders/' + id, {headers: {
                'Authorization': 'Bearer ' + userInfo.token
            }});
            dispatch({type: 'ORDER_LIST_SUCCESS', payload: data});
        }
    }
    catch(error) {
        dispatch({type: 'ORDER_LIST_FAIL', payload: error.msg});
    }
}