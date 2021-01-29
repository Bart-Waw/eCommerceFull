import express from 'express';
import { data } from './data';

const app = express();

app.get('/api/items', (req, res, next) => {
    res.send(data.items);
});

app.get('/api/items/:id', (req, res, next) => {
    const itemID = req.params.id;
    const item = data.items.find(item => item.id.toString() === itemID);
    if (item) {
        res.send(item);
    }
    else {
        res.status(404).send({msg: 'Item not found'});
    }
});

app.listen(4000, () => {
    console.log('listening')
});