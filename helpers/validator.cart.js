import { body, param } from "express-validator"
import { validateErrors } from "./validate.error.js"
import { objetctIdValid } from "./db.validators.js"

export const addToCartValidator = [
    body('userId', 'User ID cannot be empty')
        .notEmpty()
        .custom(objetctIdValid),
    body('productId', 'Product ID cannot be empty')
        .notEmpty()
        .custom(objetctIdValid),
    body('quantity', 'Quantity must be a positive integer')
        .notEmpty()
        .isInt({ min: 1 }),
    validateErrors
]

export const updateCartItemValidator = [
    body('userId', 'User ID cannot be empty')
        .notEmpty()
        .custom(objetctIdValid),
    body('productId', 'Product ID cannot be empty')
        .notEmpty()
        .custom(objetctIdValid),
    body('quantity', 'Quantity must be a positive integer')
        .notEmpty()
        .isInt({ min: 1 }),
    validateErrors
]

export const removeCartItemValidator = [
    body('userId', 'User ID cannot be empty')
        .notEmpty()
        .custom(objetctIdValid),
    body('productId', 'Product ID cannot be empty')
        .notEmpty()
        .custom(objetctIdValid),
    validateErrors
]