import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, register } from '../actions/userActions';

export function RegisterPage (props) {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const userRegister = useSelector(state => state.userRegister);
    const { loading, userInfo, error } = userRegister;
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
        if (password !== repeatPassword) {
            window.alert('passwords do not match')
        }
        if (!password || !name || !email) {
            window.alert('please complete all input fields')
        }
        else {
            dispatch(register(name, email, password));
            dispatch(login(email, password));
        }
    };

    return (
            <div className="form">
                <form onSubmit={handleSubmit}>
                    <ul className='form-container'>
                        <li>
                            <h3>Create an account</h3>
                        </li>
                        <li>
                            {loading && <div className="loading"><img src='../images/loading.gif' alt="loading"></img></div>}
                            {error && {error}}
                        </li>
                        <li>
                            <label htmlFor='name'>Name</label>
                            <input type='text' name='name' id='name' onChange={(event) => setName(event.target.value)}></input>
                        </li>
                        <li>
                            <label htmlFor='email'>Email</label>
                            <input type='email' name='email' id='email' onChange={(event) => setEmail(event.target.value)}></input>
                        </li>
                        <li>
                            <label htmlFor='password'>Password</label>
                            <input type='password' name='password' id='password' onChange={(event) => setPassword(event.target.value)}></input>
                        </li>
                        <li>
                            <label htmlFor='repeatPassword'>Repeat Password</label>
                            <input type='password' name='repeatPassword' id='repeatPassword' onChange={(event) => setRepeatPassword(event.target.value)}></input>
                        </li>
                        <li>
                            <button type='submit' className='primary-button'>Register</button>
                        </li>
                    </ul>
                </form>
                
            </div>
        )
}