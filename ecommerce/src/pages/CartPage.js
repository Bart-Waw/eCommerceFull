import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart, removeFromCart } from '../actions/cartActions';

export function CartPage(props) {

    const cart = useSelector(state => state.cart);
    const { cartItems } = cart;

    const itemID = props.match.params.id;
    const qty = props.location.search? Number(props.location.search.split("=")[1]):1;

    const dispatch = useDispatch();

    useEffect(() => {
        if(itemID) {
            dispatch(addToCart(itemID, qty))
        }
    }, [dispatch, itemID, qty])


    return (
        <div className='cart'>
            <div className='cart-list'>
                <ul className='cart-list-container'>
                    <li key ='cart-page-name'>
                        <h3>Shopping Cart</h3>
                    </li>
                    <li key ='cart-page-items'>
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
                                        <div>
                                            <button onClick={() => dispatch(removeFromCart(item._id))}>Remove</button>
                                        </div>
                                    </div>
                                </div>)
                        }
                    </li>
                </ul>
                {cartItems.length !== 0 &&
                    <div className='cart-action'>
                        <Link to='/Shipping'><button className='primary-button'>Checkout</button></Link>
                    </div>  
                }
            </div>
        </div>
        )
}