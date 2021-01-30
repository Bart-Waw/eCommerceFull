import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../actions/userActions';

export function LoginPage (props) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const userLogin = useSelector(state => state.userLogin);
    const { loading, userInfo, error } = userLogin;
    const dispatch = useDispatch();

    useEffect(() => {
        if (userInfo) {
            props.history.push('/')
        }
        return () => {
        };
    }, [userInfo, props.history]);

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(login(email, password));
    };

    return (
            <div className="form">
                <form onSubmit={handleSubmit}>
                    <ul className='form-container'>
                        <li>
                            <h3>Log In</h3>
                        </li>
                        <li>
                            {loading && <div className="loading"><img src='../images/loading.gif' alt="loading"></img></div>}
                            {error && {error}}
                        </li>
                        <li>
                            <label for='email'>Email</label>
                            <input type='email' name='email' id='email' onChange={(event) => setEmail(event.target.value)}></input>
                        </li>
                        <li>
                            <label for='password'>Password</label>
                            <input type='password' name='password' id='password' onChange={(event) => setPassword(event.target.value)}></input>
                        </li>
                        <li>
                            <button type='submit' className='primary-button'>Log In</button>
                        </li>
                        <li>
                        <Link to='/register'><button className='register-button'>Register new account</button></Link>
                        </li>
                    </ul>
                </form>
                
            </div>
        )
}