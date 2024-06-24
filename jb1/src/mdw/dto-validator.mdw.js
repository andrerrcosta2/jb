import { body, param, validationResult } from 'express-validator';
import { sanitizeObject } from '../util/rfl.util.js';

const orderKeys = ['numeroPedido', 'valorTotal', 'dataCriacao', 'items'];

export const validateCreateOrderRequest = [
    (req, res, next) => {
        try {
            sanitizeObject(req.body, orderKeys);
            next();
        } catch (error) {
            console.error('Error sanitizing object:', error.message);
            return res.status(500).json({ error: 'Internal server error' });
        }
    },
    body('numeroPedido')
    .notEmpty().withMessage('numeroPedido é obrigatório')
    .trim()
    .escape()
    .matches(/^[a-zA-Z0-9/-]+$/)
    .withMessage("Numero do pedido inválido"),
    body('valorTotal')
    .notEmpty().withMessage('valorTotal é obrigatório')
    .toFloat()
    .isNumeric()
    .isFloat({ gt: 0 })
    .withMessage("Valor Total inválido"),
    body('dataCriacao')
    .notEmpty().withMessage('Data de criação é obrigatória')
    .toDate()
    .isISO8601({strict: true})
    .withMessage("Data inválida"),
    body('items.*.idItem')
    .trim()
    .escape()
    .isAlphanumeric()
    .withMessage("Item inválido"),
    body('items.*.quantidadeItem')
    .toInt()
    .isInt()
    .withMessage("Item Qtd inválida"),
    body('items.*.valorItem')
    .toFloat()
    .isNumeric()
    .isFloat({ gt: 0 })
    .withMessage("Valor do item inválido"),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

export const validateOrderIdParam = [
    param('orderId')
    .trim()
    .escape()
    .isLength({ min: 24, max: 24 })
    .isHexadecimal()
    .withMessage('Invalid orderId.')
];