import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { savePayment } from '../actions/cartActions';

export function PaymentPage (props) {

    const [paymentMethod, setpaymentMethod] = useState('');

    const dispatch = useDispatch();

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(savePayment({paymentMethod}));
        props.history.push('placeorder');
    };

    return (
            <div className="form">
                <form onSubmit={handleSubmit}>
                    <ul className='form-container'>
                        <li>
                            <h3>Payment</h3>
                        </li>

                        <li>
                            <div>
                                <input type='radio' name='paymentMethod' id='paymentMethod' value='paypal' onChange={(event) => setpaymentMethod(event.target.value)}></input>
                                <label htmlFor='paymentMethod'>Paypal</label>
                            </div>
                        </li>

                        
                        <li>
                            <button type='submit' className='primary-button'>Continue</button>
                        </li>
                    </ul>
                </form>
                
            </div>
        )
}