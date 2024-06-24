import Order from "../../src/model/order.model";

describe('POST /order', () => {
  let createdOrderId;

  it('should create a new order', async () => {
    const newOrder = {
      numeroPedido: 'v10089015vdb-01',
      valorTotal: 10000,
      dataCriacao: '2023-07-19T12:24:11.5299601+00:00',
      items: [
        {
          idItem: '2434',
          quantidadeItem: 1,
          valorItem: 1000
        }
      ]
    };

    const res = await global.testRequest
      .post('/order')
      .send(newOrder);

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('_id');
    expect(res.body.orderId).toEqual(newOrder.numeroPedido);

    createdOrderId = res.body._id;
  });

  it('should return 400 if request body is invalid', async () => {
    const invalidOrder = {
        numeroPedido: 'v100890%15vdb-02',
        valorTotal: 10000,
        dataCriacao: '2023-07-19T12:24:11.5299601+00:00',
        items: [
          {
            idItem: '2434',
            quantidadeItem: 1,
            valorItem: 1000
          }
        ]
    };

    const res = await global.testRequest
      .post('/order')
      .send(invalidOrder);

    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('errors');
    expect(res.body.errors).toBeInstanceOf(Array);
    expect(res.body.errors).toHaveLength(1);
    expect(res.body.errors[0]).toHaveProperty('msg', 'Numero do pedido inválido');
  });

  afterAll(async () => {
    if (createdOrderId) {
      await Order.findOneAndDelete({ _id: createdOrderId });
    }
  });
});

