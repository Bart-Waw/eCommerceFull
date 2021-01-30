import axios from "axios";
import Cookie from 'js-cookie';

export const login = (email, password) => async (dispatch) => {
    dispatch({type: 'USER_LOGIN_REQUEST', payload: {email, password}});
    try{
        const {data} = await axios.post('./api/users/login', {email, password});
        dispatch({type: 'USER_LOGIN_SUCCESS', payload: data});
        Cookie.set('userInfo', JSON.stringify(data));
    }
    catch (error) {
        dispatch({type: 'USER_LOGIN_FAIL', payload: error.message});
    }
}

export const register = (name, email, password) => async (dispatch) => {
    dispatch({type: 'USER_REGISTER_REQUEST', payload: {name, email, password}});
    try{
        const {data} = await axios.post('./api/users/register', {name, email, password});
        dispatch({type: 'USER_REGISTER_SUCCESS', payload: data});
        Cookie.set('userInfo', JSON.stringify(data));
    }
    catch (error) {
        dispatch({type: 'USER_REGISTER_FAIL', payload: error.message});
    }
}