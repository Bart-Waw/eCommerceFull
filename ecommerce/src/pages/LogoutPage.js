import React from 'react';
import { Link } from 'react-router-dom';

export function LogoutPage () {

    return (
            <div className='log-out'>
                <h2>You have been logged out</h2>
                <div className='return-home'>
                    <Link to='/'>Return to HomePage</Link>
                </div>
                
            </div>
        )
}