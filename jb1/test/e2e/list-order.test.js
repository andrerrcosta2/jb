import Order from "../../src/model/order.model";

describe('GET /order/list', () => {
  let createdOrderId1, createdOrderId2;

  beforeAll(async () => {
    const ordersData = [
      {
        orderId: 'v10089015vdb-26',
        value: 10000,
        creationDate: new Date('2023-07-19T12:24:11.529Z'),
        items: [
          { productId: 2434, quantity: 1, price: 1000 }
        ]
      },
      {
        orderId: 'v10089016vdb-26',
        value: 15000,
        creationDate: new Date('2023-07-20T10:15:00.000Z'),
        items: [
          { productId: 5678, quantity: 2, price: 5000 },
          { productId: 7890, quantity: 1, price: 10000 }
        ]
      }
    ];
    
    const savedOrders = await Order.insertMany(ordersData);
    createdOrderId1 = savedOrders[0]._id.toString();
    createdOrderId2 = savedOrders[1]._id.toString();
  });
  
  it('should list all orders', async () => {
    const res = await global.testRequest.get('/order/list');
    
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();

    expect(res.body.length).toBe(2);
    console.log("Body", res.body.map(order => order._id));
    console.log("Ids", [createdOrderId1, createdOrderId2]);
    expect(res.body.some(order => order._id === createdOrderId1)).toBe(true);
    expect(res.body.some(order => order._id === createdOrderId2)).toBe(true);
  });

  afterAll(async () => {
    await Order.deleteMany({ _id: { $in: [createdOrderId1, createdOrderId2] } });
  });
});
