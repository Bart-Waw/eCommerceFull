import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { saveShipping } from '../actions/cartActions';

export function ShippingPage (props) {

    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [postcode, setPostcode] = useState('');
    const [country, setCountry] = useState('');

    const dispatch = useDispatch();

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(saveShipping({address, city, postcode, country}));
        props.history.push('payment');
    };

    return (
            <div className="form">
                <form onSubmit={handleSubmit}>
                    <ul className='form-container'>
                        <li>
                            <h3>Shipping</h3>
                        </li>
                        <li>
                            <label htmlFor='address'>Address</label>
                            <input type='text' name='address' id='address' onChange={(event) => setAddress(event.target.value)}></input>
                        </li>

                        <li>
                            <label htmlFor='city'>City</label>
                            <input type='text' name='city' id='city' onChange={(event) => setCity(event.target.value)}></input>
                        </li>

                        <li>
                            <label htmlFor='postcode'>Postcode</label>
                            <input type='text' name='postcode' id='postcode' onChange={(event) => setPostcode(event.target.value)}></input>
                        </li>

                        <li>
                            <label htmlFor='country'>Country</label>
                            <input type='text' name='country' id='country' onChange={(event) => setCountry(event.target.value)}></input>
                        </li>
                        
                        <li>
                            <button type='submit' className='primary-button'>Continue</button>
                        </li>
                    </ul>
                </form>
                
            </div>
        )
}