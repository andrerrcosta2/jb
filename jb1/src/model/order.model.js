import mongoose, { Schema, model } from 'mongoose';

const orderSchema = new Schema({
  orderId: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: async function(orderId) {
        // Check if an order with this orderId already exists
        const existingOrder = await mongoose.models.Order.findOne({ orderId });
        return !existingOrder;
      },
      message: 'orderId must be unique'
    }
  },
  value: { type: Number, required: true },
  creationDate: { type: Date, required: true },
  items: [{
    productId: { type: Number, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true }
  }]
}, {
  versionKey: '__v'
});

const Order = model('Order', orderSchema);

export default Order;
