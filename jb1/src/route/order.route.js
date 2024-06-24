/**
 * @swagger
 * components:
 *   schemas:
 *     Order:
 *       type: object
 *       properties:
 *         orderId:
 *           type: string
 *           description: The order ID
 *         value:
 *           type: number
 *           description: The total value of the order
 *         creationDate:
 *           type: string
 *           format: date-time
 *           description: The creation date of the order
 *         items:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *                 description: The product ID
 *               quantity:
 *                 type: integer
 *                 description: The quantity of the product
 *               price:
 *                 type: number
 *                 description: The price of the product
 */

import { Router } from 'express';
const router = Router();
import {
  createOrder,
  getOrderById,
  getAllOrders,
  updateOrder,
  deleteOrder,
} from '../service/order.service.js';
import { validateCreateOrderRequest, validateOrderIdParam } from '../mdw/dto-validator.mdw.js';
import DomainNotFoundError from '../error/domain-not-found.error.js';

/**
 * @swagger
 * /order:
 *   post:
 *     summary: Create a new order
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Order'
 *     responses:
 *       '201':
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       '400':
 *         description: Bad request
 */
router.post('/', validateCreateOrderRequest, async (req, res) => {
  try {
    const savedOrder = await createOrder(req.body);
    res.status(201).json(savedOrder);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/**
 * @swagger
 * /order/list:
 *   get:
 *     summary: List all orders
 *     tags: [Orders]
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 *       '500':
 *         description: Internal server error
 */
router.get('/list', async (req, res) => {
  try {
    const orders = await getAllOrders();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * @swagger
 * /order/{orderId}:
 *   get:
 *     summary: Get an order by orderId
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *         description: The order ID
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       '404':
 *         description: Order not found
 */
router.get('/:orderId', validateOrderIdParam, async (req, res) => {
  try {
    const order = await getOrderById(req.params.orderId);
    if (!order) {
      return res.status(404).json({ message: 'Pedido não encontrado' });
    }
    res.json(order);
  } catch (err) {
    if (err instanceof DomainNotFoundError) {
      console.error(err.message);
      res.status(404).json({ message: "Pedido não encontrado" });
    } else {
      console.error("the error is:", err);
      res.status(400).json({ message: err.message });
    }
  }
});

/**
 * @swagger
 * /order/{orderId}:
 *   put:
 *     summary: Update an order by orderId
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *         description: The order ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Order'
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       '400':
 *         description: Bad request
 *       '404':
 *         description: Order not found
 */
router.put('/:orderId', validateOrderIdParam, async (req, res) => {
  try {
    const updatedOrder = await updateOrder(req.params.orderId, req.body);
    if (!updatedOrder) {
      return res.status(404).json({ message: 'Pedido não encontrado' });
    }
    res.json(updatedOrder);
  } catch (err) {
    if (err instanceof DomainNotFoundError) {
      console.error(err.message);
      res.status(404).json({ message: "Pedido não encontrado" });
    } else {
      console.error("the error is:", err);
      res.status(400).json({ message: err.message });
    }
  }
});

/**
 * @swagger
 * /order/{orderId}:
 *   delete:
 *     summary: Delete an order by orderId
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *         description: The order ID
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Deletion success message
 *       '404':
 *         description: Order not found
 */
router.delete('/:orderId', validateOrderIdParam, async (req, res) => {
  try {
    const deletedOrder = await deleteOrder(req.params.orderId);
    if (!deletedOrder) {
      return res.status(404).json({ message: 'Pedido não encontrado' });
    }
    res.json({ message: 'Pedido deletado com sucesso' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
