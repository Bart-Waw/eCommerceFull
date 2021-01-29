import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../actions/cartActions';

export function CartPage(props) {
    const cart = useSelector(state => state.cart);
    const {cartItems} = cart;

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
                    <li>
                        <h3>Shopping Cart</h3>
                        <div>Price</div>
                    </li>
                    <li>
                        {
                            cartItems.length === 0 ?
                            <div>Your cart is empty</div> :
                            cartItems.map(item => 
                                <div>
                                    <img src={item.image} alt='item' ></img>
                                    <div className='cart-name'>
                                        <div>
                                            {item.name}
                                        </div>
                                        <div>
                                            Quantity: {item.qty}
                                        </div>
                                        <div>
                                            {item.price}
                                        </div>
                                    </div>
                                </div>)
                        }
                    </li>
                </ul>
            </div>
            <div className='cart-action'>

            </div>
        </div>
        )
}