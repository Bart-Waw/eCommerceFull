import express from 'express';
import dotenv from 'dotenv';
import userRouter from './Routes/userRoute';
import itemRouter from './Routes/itemRoute';
import orderRouter from './Routes/orderRoute';
import bodyParser from 'body-parser';
const pool = require('./db');

dotenv.config();

const app = express();
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use('/api/users', userRouter);
app.use('/api/items', itemRouter);
app.use('/api/orders', orderRouter);

app.get('/api/item/:id', async (req, res, next) => {
    const item = await pool.query(`select * from items where _id = '${req.params.id}';`)
    res.send(item.rows[0]);
});

/*
app.get('/api/item', (req, res, next) => {
    res.send(data.items);
});

app.get('/api/item/:id', (req, res, next) => {
    const itemID = req.params.id;
    const item = data.items.find(item => item.id.toString() === itemID);
    if (item) {
        res.send(item);
    }
    else {
        res.status(404).send({msg: 'Item not found'});
    }
});
*/

app.listen(4000, () => {
    console.log('listening')
});