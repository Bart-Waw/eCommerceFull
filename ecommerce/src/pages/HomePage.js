import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { listItems } from '../actions/itemActions'

export function HomePage (props) {

    const itemList = useSelector(state => state.itemList);
    const { items, loading, error } = itemList;
    const dispatch = useDispatch();

    useEffect(() => {       
        dispatch(listItems());
        return () => {
        };
    }, [dispatch]);

    

    return (
        loading? <div><img className="loading" src='../images/loading.gif' alt="loading"></img></div> : 
        error? <div>{error}</div> :
        <div>
            <ul className="items">
                {
                items.map(item =>
                    <li key={item.id}>
                    <div className="item">
                        <Link to={'/items/' + item.id}>
                            <img className="item-image" src={item.image} alt="white t-shirt"></img>
                            <div className="item-name">{item.name}</div>
                        </Link>
                        <div className="item-price">£{item.price}</div>
                    </div>
                </li>
                )
                }
            </ul>
        </div>
    )
}