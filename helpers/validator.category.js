import { body, param } from "express-validator"
import { validateErrors } from "./validate.error.js"
import { objetctIdValid } from "./db.validators.js"

// Guardar nueva categoría
export const saveCategoryValidator = [
    body('name', 'Category name cannot be empty')
        .notEmpty()
        .isLength({ max: 50 })
        .withMessage('Category name cannot exceed 50 characters'),
    body('description', 'Category description cannot be empty')
        .notEmpty()
        .isLength({ max: 255 })
        .withMessage('Description cannot exceed 255 characters'),
]

export const categoryIdValidator = [
    param('id', 'Invalid category ID')
        .notEmpty()
        .custom(objetctIdValid),
    validateErrors
]
    