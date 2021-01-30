import express from 'express';
import config from './config';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import userRouter from './Routes/userRoute';
import itemRouter from './Routes/itemRoute'
import bodyParser from 'body-parser';
import Item from './models/itemModel';

dotenv.config();

const mongodbURL = config.MONGODB_URL;
mongoose.connect(mongodbURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true 
}).catch(error => console.log(error.reason));

const app = express();
app.use(bodyParser.json());
app.use('/api/users', userRouter);
app.use('/api/items', itemRouter);

app.get('/api/item/:id', async (req, res, next) => {
    const itemID = req.params.id;
    const item = await Item.findOne({_id : itemID});
    res.send(item);
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