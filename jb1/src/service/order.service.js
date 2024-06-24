import Order from '../model/order.model.js';
import DomainError from  '../error/domain.error.js';
import DomainNotFoundError from '../error/domain-not-found.error.js'
import { createOrderRequestToOrder, updateOrderRequestToOrder } from '../mapper/order.mapper.js';

export const createOrder = async (orderData) => {
  try {
    const newOrder = createOrderRequestToOrder(orderData);
    const savedOrder = await newOrder.save();
    return savedOrder;
  } catch (err) {
    console.error("\n\nError createOrder:", err, "\n\n");
    throw new DomainError(err.message);
  }
};

export const getOrderById = async (orderId) => {
  try {
    const order = await Order.findOne({ orderId });
    
    if (!order) {
      throw new DomainNotFoundError(`Order "${orderId}" not found`);
    }
    return order;
  } catch (err) {
    if (err instanceof DomainNotFoundError) {
      throw err;
    }
    console.error("\n\nError getOrderById:", err, "\n\n");
    throw new DomainError(err.message);
  }
};

export const getAllOrders = async () => {
  try {
    const orders = await Order.find();
    return orders;
  } catch (err) {
    console.error("\n\nError getAllOrders:", err, "\n\n");
    throw new DomainError(err.message);
  }
};

export const updateOrder = async (orderId, orderData) => {
  console.log(`\n\nUpdate Order\n\n`);
  try {
    const existingOrder = await Order.findOne({ orderId });
    
    if (!existingOrder) {
      console.error(`\n\nError updateOrder: Order "${orderId}" not found\n\n`);
      throw new DomainNotFoundError(`Order "${orderId}" not found`);
    }
    console.log(`\n\Before Mapping Update: ${orderData}`);
    const updateOrder = updateOrderRequestToOrder(orderData, existingOrder);
    console.log(`\n\nOrder.findOneAndUpdate: ${updateOrder}`);
    const updatedOrder = await Order.findOneAndUpdate(
      { orderId, __v: existingOrder.__v },
      updateOrder,
      { new: true }
    );
    console.log(`\n\nupdated? ${updateOrder}`);
    if (!updatedOrder) {
      // A retry operation would be the correct approach here
      console.error('Concurrency Error: Order was modified by another process.');
      throw new DomainError('Internal Server Error, try again later');
    }
    
    return updatedOrder;
  } catch (err) {
    if (err instanceof DomainNotFoundError) {
      throw err;
    }
    console.error(`\n\nError updateOrder: "${err}"\n\n`);
    throw new DomainError(err.message);
  }
};

export const deleteOrder = async (orderId) => {
  try {
    const deletedOrder = await Order.findOneAndDelete({ orderId });
    return deletedOrder;
  } catch (err) {
    console.error(`\n\nError deleteOrder: "${err}"\n\n`);
    throw new DomainError(err.message);
  }
};
