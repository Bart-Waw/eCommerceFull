import express from 'express';
import Item from '../models/itemModel';

const itemRouter = express.Router();

itemRouter.get('/', async (req, res, next) => {
    const items = await Item.find({});
    res.send(items);
});

itemRouter.post('/', async (req, res, next) => {
    const item = new Item({
        name: req.body.name,
        price: req.body.price,
        image: req.body.image,
        category: req.body.category,
        stock: req.body.stock,
        description: req.body.description
    });
    const newItem = await item.save();
    if (newItem) {
        res.status(201).send({ msg: 'New item added', data: newItem });
    }
    else {
        res.status(500).send({ msg: 'Invalid data' });
    }
});

itemRouter.put('/:id', async (req, res, next) => {
    const itemID = req.params.id;
    const item = await Item.findOne({_id : itemID});
    if (item) {
        item.name = req.body.name;
        item.price = req.body.price;
        item.image = req.body.image;
        item.category = req.body.category;
        item.stock = req.body.stock;
        item.description = req.body.description;
        const updatedItem = await item.save();
        if (updatedItem) {
            res.status(200).send({ msg: 'Item updated', data: updatedItem });
        }
    }
    else {
        res.status(500).send({ msg: 'Invalid data' });
    }
});

export default itemRouter;