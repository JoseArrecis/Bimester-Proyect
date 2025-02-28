import { body, param } from "express-validator"
import { validateErrors } from "./validate.error.js"
import { existEmail, existUsername, objetctIdValid } from "./db.validators.js"

export const updateUserValidator = [
    param('id', 'Invalid user ID')
        .notEmpty()
        .custom(objetctIdValid),
    body('name').optional().isLength({ max: 50 }),
    body('surname').optional().isLength({ max: 50 }),
    body('phone').optional().isMobilePhone(),
    validateErrors
]

export const updatePasswordValidator = [
    param('id', 'Invalid user ID')
        .notEmpty()
        .custom(objetctIdValid),
    body('password', 'Password must be at least 8 characters long')
        .notEmpty()
        .isLength({ min: 8 }),
    validateErrors
]

export const userIdValidator = [
    param('id', 'Invalid user ID')
        .notEmpty()
        .custom(objetctIdValid),
    validateErrors
]
