import { body, param } from "express-validator"
import { validateErrors } from "./validate.error.js"
import { objetctIdValid } from "./db.validators.js"

// Agregar un producto
export const saveProductValidator = [
    body('name', 'Product name cannot be empty')
        .notEmpty()
        .isLength({ max: 50 })
        .withMessage('Product name cannot exceed 50 characters'),
    body('description', 'Product description cannot be empty')
        .notEmpty()
        .isLength({ max: 100 })
        .withMessage('Description cannot exceed 100 characters'),
    body('price', 'Product price cannot be empty')
        .notEmpty(),
    body('stock')
        .notEmpty().withMessage('Stock cannot be empty')
        .isInt({ min: 0 }).withMessage('Stock must be a non-negative integer'),
]

export const productIdValidator = [
    param('id', 'Invalid product ID')
        .notEmpty()
        .custom(objetctIdValid),
    validateErrors
]
    