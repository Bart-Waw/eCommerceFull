import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listOrders } from '../actions/orderActions';

export function OrdersPage (props) {

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    const orderList = useSelector(state => state.orderList)
    const { orders } = orderList;
    const dispatch = useDispatch();

    useEffect(() => {
        if (userInfo.name === 'Admin') {
            dispatch(listOrders());
        }
        else {
            dispatch(listOrders(userInfo._id));
        }
        return () => {

        };
    }, [dispatch, userInfo._id, userInfo.name]);

    return (
        <div className='items-content'>
            <div className='item-header'>
                <h3>Orders</h3>
            </div>
                <table>
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Items</th>
                        <th>Shipping Address</th>
                        <th>Payment Method</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {orders && orders.map(order => (
                        <tr>
                            <td>{order._id}</td>
                            <td>{order.items.map(item => <div>{item.qty} {item.name}</div>)}</td>
                            <td>{order.address}, {order.city}, {order.postcode}, {order.country}</td>
                            <td>{order.paymentMethod}</td>
                            <td>£{order.price}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        
        </div>
        )
}