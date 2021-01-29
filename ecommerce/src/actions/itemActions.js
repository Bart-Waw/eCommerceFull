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
        const {data} = await axios.get('/api/items/' + itemID);
        dispatch({type: 'ITEM_DETAILS_SUCCESS', payload: data})
    }
    catch(error) {
        dispatch({type: 'ITEM_DETAILS_FAIL', payload: error.message});
    }
}