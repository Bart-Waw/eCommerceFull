import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart } from '../actions/cartActions';
import { placeOrder } from '../actions/orderActions';
import Cookie from 'js-cookie';

export function PlaceOrderPage (props) {
    const dispatch = useDispatch();

    let total = 0;
    
    const cart = useSelector(state => state.cart);
    const { cartItems } = cart;

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    cartItems.forEach(item => total += item.price * item.qty);

    const handlePlaceOrder = async () => {
        if (!userInfo) {
            window.alert('please log in to proceed')
        }
        else {
            await dispatch(placeOrder(userInfo._id, cartItems, cart.shipping.address, cart.shipping.city, cart.shipping.postcode, cart.shipping.country, cart.payment.paymentMethod, total));
            props.history.push('orderComplete');
            dispatch(clearCart());
            Cookie.set('cartItems', []);
        }
    };

    return (
        <div className='placeorder'>
            <div className='placeorder-info'>
                <div>
                    <h3>Shipping Address</h3>
                    <div>
                        <div>Street: <p>{cart.shipping.address}</p></div>
                        <div>City: <p>{cart.shipping.city}</p></div>
                        <div>Postcode: <p>{cart.shipping.postcode}</p></div>
                        <div>Country: <p>{cart.shipping.country}</p></div>
                    </div>
                </div>
                <div>
                    <h3>Payment</h3>
                    <div>Payment Method: 
                        <p>{cart.payment.paymentMethod}</p></div>
                    <div>Total Price:
                        <p>£{total}</p></div>
                </div>
            
            <div className='cart'>
                <ul className='cart-list-container'>
                    <li>
                        <h3>Shopping Cart</h3>
                    </li>
                    <li>
                        {
                            cartItems.length === 0 ?
                            <div>Your cart is empty</div> :
                            cartItems.map(item => 
                                <div className='cart-item'>
                                    <img src={item.image} alt='item' ></img>
                                    <div className='cart-name'>
                                        <div>
                                            {item.name}
                                        </div>
                                        <div>
                                            Quantity: {item.qty}
                                        </div>
                                        <div>
                                            Price: £{item.qty * item.price}
                                        </div>
                                    </div>
                                </div>)
                        }
                    </li>
                </ul>
            </div>
            </div>
            <div className='placeorder-action'>
                <button className='primary-button' type='submit' onClick={handlePlaceOrder}>Place Order</button>
            </div>
        </div>
        )
}