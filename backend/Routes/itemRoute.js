import express from 'express';
import { isAdmin, isAuth } from '../util';
const pool = require('../db');

const itemRouter = express.Router();

itemRouter.get('/', async (req, res, next) => {
    const items = await pool.query('select * from items;')
    res.send(items.rows);
});



itemRouter.get('/:id', async (req, res, next) => {
    const item = await pool.query(`select * from items where _id = '${req.params.id}';`)
    console.log(item.rows[0]);
    if (item) {
        res.send(item.rows[0]);
    }
    else {
        res.status(404).send({msg: 'Item not found'});
    }
    
});

itemRouter.post('/', isAuth, isAdmin, async (req, res, next) => {
    const item = {
        name: req.body.name,
        price: req.body.price,
        image: req.body.image,
        category: req.body.category,
        stock: req.body.stock,
        description: req.body.description
    };
    const newItem = await pool.query(`insert into items (name, price, image, category, stock, description) values
    ('${item.name}', ${item.price}, '${item.image}', '${item.category}', ${item.stock}, '${item.description}');`)
    if (newItem) {
        res.status(201).send({ msg: 'New item added', data: newItem.rows[0] });
    }
    else {
        res.status(500).send({ msg: 'Invalid data' });
    }
});

itemRouter.put('/:id', isAuth, isAdmin, async (req, res, next) => {
    const request = await pool.query(`select * from items where _id = '${req.params.id}';`)
    const item = request.rows[0];
    if (item) {
        item.name = req.body.name;
        item.price = req.body.price;
        item.image = req.body.image;
        item.category = req.body.category;
        item.stock = req.body.stock;
        item.description = req.body.description;
        const updatedItem = await pool.query(`update items set 
            name = '${item.name}', 
            price = ${item.price}, 
            image = '${item.image}', 
            category = '${item.category}', 
            stock = ${item.stock}, 
            description = '${item.description}'
            where _id = '${itemID}';`)
        if (updatedItem) {
            res.status(200).send({ msg: 'Item updated', data: updatedItem.rows[0] });
        }
    }
    else {
        res.status(500).send({ msg: 'Invalid data' });
    }
});

itemRouter.delete('/:id', isAuth, isAdmin, async( req, res, next ) => {
    const deletedItem = await pool.query(`select * from items where _id = '${req.params.id}';`)
    if (deletedItem) {
        await pool.query(`delete from items where _id = '${req.params.id}';`)
        res.send({msg: 'Item removed'});
    }
    else {
        res.send({msg: 'Item not found'});
    }
})

export default itemRouter;