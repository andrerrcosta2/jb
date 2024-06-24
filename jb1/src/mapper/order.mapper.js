import Order from "../model/order.model.js";

export const createOrderRequestToOrder = (orderData) => {
    return new Order({
        orderId: orderData.numeroPedido,
        value: orderData.valorTotal,
        creationDate: orderData.dataCriacao,
        items: orderData.items.map(item => ({
          productId: item.idItem,
          quantity: item.quantidadeItem,
          price: item.valorItem
        }))
    });
};

export const updateOrderRequestToOrder = (updateData, existingOrder) => {
    const updatedOrder = {};
    updatedOrder.value = updateData.valorTotal !== undefined ? updateData.valorTotal : existingOrder.value;

    // This should use a different endpoint because is annoying to handle update rules
    // for lists dinamically and is very prone to errors.
    if (updateData.items !== undefined) {
        updatedOrder.items = updateData.items.map(item => ({
            productId: item.idItem,
            quantity: item.quantidadeItem,
            price: item.valorItem
        }));
    } else {
        updatedOrder.items = existingOrder.items;
    }

    return updatedOrder;
};


  