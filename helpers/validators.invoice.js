import { body, param } from 'express-validator'
import { validateErrors } from './validate.error.js'
import { objetctIdValid } from "./db.validators.js"

export const saveInvoiceValidator = [
    body('userId', 'Invalid user ID')
        .notEmpty()
        .custom(objetctIdValid),
    body('items')
        .isArray({ min: 1 })
        .withMessage('Items should be an array with at least one product'),
    body('items.*.productId', 'Invalid product ID')
        .notEmpty()
        .custom(objetctIdValid), 
    body('items.*.quantity', 'Quantity must be a positive integer')
        .notEmpty()
        .isInt({ min: 1 })
        .withMessage('Quantity must be at least 1'),
    validateErrors
]
