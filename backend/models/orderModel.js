import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    userID: { type: String, required: true },
    items: { type: Array, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    postcode: { type: String, required: true },
    country: { type: String, required: true },
    paymentMethod: { type: String, required: true },
    price: { type: Number, required: true }
});

const orderModel = mongoose.model('Order', orderSchema);

export default orderModel;