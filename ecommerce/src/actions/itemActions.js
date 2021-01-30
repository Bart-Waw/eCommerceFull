import axios from 'axios';

export const listItems = () => async (dispatch) => {
    try {
        dispatch({type: 'ITEM_LIST_REQUEST'});
        const {data} = await axios.get('/api/items');
        dispatch({type: 'ITEM_LIST_SUCCESS', payload: data});
    }
    catch(error) {
        dispatch({type: 'ITEM_LIST_FAIL', payload: error.message});
    }
}

export const detailsItem = (itemID) => async (dispatch) => {
    try {
        dispatch({type: 'ITEM_DETAILS_REQUEST', payload: itemID});
        const {data} = await axios.get('/api/item/' + itemID);
        dispatch({type: 'ITEM_DETAILS_SUCCESS', payload: data})
    }
    catch(error) {
        dispatch({type: 'ITEM_DETAILS_FAIL', payload: error.message});
    }
}

export const saveItem = (item) => async (dispatch, getState) => {
    try {
        dispatch({ type: 'ITEM_SAVE_REQUEST', payload: item });
        const { userLogin: {userInfo}} = getState();
        if (!item._id) {
            const { data } = await axios.post('/api/items', item, {headers: {
                'Authorization': 'Bearer ' + userInfo.token
            }})
            dispatch({ type: 'ITEM_SAVE_SUCCESS', payload: data});
        }
        else {
            const { data } = await axios.put(`/api/items/${item._id}`, item, {headers: {
                'Authorization': 'Bearer ' + userInfo.token
            }})
            dispatch({ type: 'ITEM_SAVE_SUCCESS', payload: data});
        }
    }
    catch (error) {
        dispatch({ type: 'ITEM_SAVE_FAIL', payload: error.message});
    }
}