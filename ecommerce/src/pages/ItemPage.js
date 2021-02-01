import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { detailsItem } from '../actions/itemActions';

export function ItemPage (props) {

    const [qty, setQty] = useState(1);

    const itemDetails = useSelector(state => state.itemDetails);
    const { item, loading, error } = itemDetails;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(detailsItem(props.match.params.id));
        return () => {
        };
    }, [dispatch, props.match.params.id]);

    const handleAddtoCart = () => {
        props.history.push('/cart/' + props.match.params.id + '?qty=' + qty);
    }


    return (
        loading? <div className="loading"><img src='../images/loading.gif' alt="loading"></img></div> : 
        error? <div>{error}</div> : 
            <div>
                <div>
                    <Link to='/'>Return to HomePage</Link>
                </div>
                <div className='itemDetails'>
                    <div className='itemMain'>
                        <h1 className="item-name">{item.name}</h1>
                        <img className="item-image" src={item.image} alt="white t-shirt"></img>
                    </div>
                    <div className='itemSub'>
                        <ul>
                            <li>Price: £{item.price}</li>
                            <li>{item.description}</li>
                        </ul>
                    </div>
                    <div className='addToCart'>
                        <ul>
                            <li>Total price: £{qty * item.price}</li>
                            {item.stock > 0 &&
                                <li>Quantity: 
                                <select value={qty} onChange={(event) => {setQty(event.target.value)}}>
                                    {[...Array(item.stock).keys()].map(option => 
                                    <option value={option+1}>{option+1}</option>)}
                                </select>
                            </li>
                            }
                            <li>
                                {item.stock > 0 ? 
                                <button onClick={handleAddtoCart}>Add to Cart</button> :
                                <div style={{color: 'red', fontWeight: 'bold'}}>Out of Stock</div>
                                }
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        )
}