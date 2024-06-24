import Order from "../../src/model/order.model.js";

describe('GET /order/:orderId', () => {

  let createdOrderId;

  beforeAll(async () => {
    const newOrder = new Order({
      orderId: 'v10089015vdb-26',
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
  it('should get order by orderId', async () => {

    const res = await global.testRequest
      .get(`/order/${createdOrderId}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('_id');
    expect(res.body.orderId).toEqual(createdOrderId);
  });

  it('should return 404 if order not found', async () => {
    const nonExistingOrderId = 'non-existing-order-id';

    const res = await global.testRequest
      .get(`/order/${nonExistingOrderId}`);

    expect(res.statusCode).toEqual(404);
    expect(res.body).toHaveProperty('message', 'Pedido não encontrado');
  });

  afterAll(async () => {
    await Order.findOneAndDelete({ orderId: createdOrderId });
  });
});
