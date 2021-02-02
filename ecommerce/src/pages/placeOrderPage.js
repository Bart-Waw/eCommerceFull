import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

export function PlaceOrderPage (props) {
    let total = 0;
    
    const cart = useSelector(state => state.cart);
    const { cartItems } = cart;

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    cartItems.forEach(item => total += item.price * item.qty);

    const handlePlaceOrder = () => {
        if (!userInfo) {
            window.alert('please log in to proceed')
        }
        //
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
                    <button className='primary-button' onClick={handlePlaceOrder}>Place Order</button>
            </div>
        </div>
        )
}