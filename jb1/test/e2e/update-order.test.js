import Order from "../../src/model/order.model";

describe('PUT /order/:orderId', () => {

  let createdOrderId;

  beforeAll(async () => {
    const newOrder = new Order({
      orderId: 'v10089015vdb-32',
      value: 10000,
      creationDate: new Date(),
      items: [
        { productId: '2434', 
          quantity: 1, 
          price: 1000  
        }
      ]
    });

    const savedOrder = await newOrder.save();
    createdOrderId = savedOrder.orderId;
  });

  it('should update order by orderId', async () => {

    const updatedOrderData = {
      valorTotal: 15000,
    };

    console.log(`\n\nshould update order by orderId: ${createdOrderId}`);

    const res = await global.testRequest
      .put(`/order/${createdOrderId}`)
      .send(updatedOrderData);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('_id');
    expect(res.body.value).toEqual(updatedOrderData.valorTotal);
  });

  it('should return 404 if order not found', async () => {
    const nonExistingOrderId = 'non-existing-order-id';
    const updatedOrderData = {
      valorTotal: 15000,
    };

    const res = await global.testRequest
      .put(`/order/${nonExistingOrderId}`)
      .send(updatedOrderData);

    expect(res.statusCode).toEqual(404);
    expect(res.body).toHaveProperty('message', 'Pedido não encontrado');
  });

  afterAll(async () => {
    await Order.findOneAndDelete({ orderId: createdOrderId });
  });
});
