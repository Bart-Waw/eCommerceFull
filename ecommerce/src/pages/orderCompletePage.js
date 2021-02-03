import React from 'react';
import { Link } from 'react-router-dom';

export function orderCompletePage () {

    return (
            <div className='log-out'>
                <h2>Your order has been placed</h2>
                <div className='return-home'>
                    <Link to='/'>Return to HomePage</Link>
                </div>
                
            </div>
        )
}