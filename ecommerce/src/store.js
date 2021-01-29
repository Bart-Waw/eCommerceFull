import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import Cookie from 'js-cookie';
import {itemListReducer, itemDetialsReducer} from './reducers/itemReducers';
import { cartReducer } from './reducers/cartReducers';

const cartItems = Cookie.getJSON('cartItems') || [];

const initialState = { cart: { cartItems }};
const reducer = combineReducers({
    itemDetails: itemDetialsReducer,
    itemList: itemListReducer,
    cart: cartReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));