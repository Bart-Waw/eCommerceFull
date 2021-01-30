import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import Cookie from 'js-cookie';
import { itemListReducer, itemDetialsReducer, itemSaveReducer } from './reducers/itemReducers';
import { cartReducer } from './reducers/cartReducers';
import { userLoginReducer, userRegisterReducer } from './reducers/userReducers';

const cartItems = Cookie.getJSON('cartItems') || [];
const userInfo = Cookie.getJSON('userInfo') || null;

const initialState = { cart: { cartItems }, userLogin: { userInfo }};
const reducer = combineReducers({
    itemDetails: itemDetialsReducer,
    itemList: itemListReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    itemSave: itemSaveReducer
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));