import express from 'express';
import Order from '../models/orderModel';
import { isAdmin, isAuth } from '../util';

const orderRouter = express.Router();

orderRouter.get('/', isAuth, async (req, res, next) => {
    const orders = await Order.find({});
    res.send(orders);
});

orderRouter.get('/:id', isAuth, async (req, res, next) => {
    const orders = await Order.find({userID: req.params.id});
    if (orders) {
        res.send(orders);
    }
    else {
        res.status(404).send({msg: 'Order not found'});
    }
    
});

orderRouter.post('/placeOrder', async (req, res, next) => {
    const order = new Order({
        items: req.body.items,
        userID: req.body.userID,
        price: req.body.price,
        address: req.body.address,
        city: req.body.city,
        postcode: req.body.postcode,
        country: req.body.country,
        paymentMethod: req.body.paymentMethod,
        price: req.body.price
    })
    const newOrder = await order.save();
    if (newOrder) {
        res.status(201).send({ msg: 'New order added', data: newOrder });
    }
    else {
        res.status(500).send({ msg: 'Invalid data' });
    }
});

export default orderRouter;