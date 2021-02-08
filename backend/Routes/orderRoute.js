import express from 'express';
import { isAuth } from '../util';
const pool = require('../db');

const orderRouter = express.Router();

orderRouter.get('/', isAuth, async (req, res, next) => {
    const orders = await pool.query(`select * from orders;`)
    console.log(orders.rows);
    res.send(orders.rows);
});

orderRouter.get('/:id', isAuth, async (req, res, next) => {
    const orders = await pool.query(`select * from orders where userID = '${req.params.id}';`)
    if (orders) {
        res.send(orders.rows);
    }
    else {
        res.status(404).send({msg: 'No orders found'});
    }
    
});

orderRouter.post('/placeOrder', async (req, res, next) => {
    console.log(req.body.items);
    let itemString = '';
    req.body.items.forEach(item => {itemString += item.qty + ' ' + item.name + '\n';});

    const order = {
        items: itemString,
        userID: req.body.userID,
        price: req.body.price,
        address: req.body.address,
        city: req.body.city,
        postcode: req.body.postcode,
        country: req.body.country,
        paymentMethod: req.body.paymentMethod
    }
    const newOrder = await pool.query(
        `insert into orders 
        (items, userID, price, address, city, postcode, country, paymentMethod) values
    ('${order.items}', '${order.userID}', ${order.price}, '${order.address}', '${order.city}', '${order.postcode}', '${order.country}', '${order.paymentMethod}');`)
    if (newOrder) {
        res.status(201).send({ msg: 'New order added', data: newOrder.rows[0] });
    }
    else {
        res.status(500).send({ msg: 'Invalid data' });
    }
});

export default orderRouter;