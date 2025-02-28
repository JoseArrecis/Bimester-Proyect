import { body } from "express-validator"
import { 
    validateErrors, 
    validateErrorWithoutImg 
} from "./validate.error.js";
import { 
    existEmail,
    existUsername, 
    objetctIdValid 
} from "./db.validators.js"

export const registerValidator = [
    body('name', 'Name cannot be empty')
        .notEmpty(),
    body('surname', 'Surname cannot be empty')
        .notEmpty(),
    body('email', 'Email cannot be empty or is not a valid email')
        .notEmpty()
        .isEmail()
        .custom(existEmail),
    body('username', 'Username cannot be empty')
        .notEmpty()
        .toLowerCase()
        .custom(existUsername),
    body('password', 'Password cannot be empty')
        .notEmpty()
        .isLength({ min: 8 })
        .withMessage('The password must be at least 8 characters long'),
    body('phone', 'Phone cannot be empty or is not a valid phone')
        .notEmpty()
        .isMobilePhone(),
    validateErrors
]

export const loginValidator = [
    body('userLoggin', 'Username or email cannot be empty')
        .notEmpty()
        .toLowerCase(),    
    body('password', 'Password cannot be empty')
        .notEmpty()
        .isStrongPassword()
        .withMessage('The password must be strong')
        .isLength({min: 8}), 
    validateErrorWithoutImg
]

//Category
export const saveCategoryValidator = [
    body('name', 'Category name cannot be empty')
        .notEmpty()
        .isLength({ max: 50 })
        .withMessage('Category name cannot exceed 50 characters'),
    body('description', 'Category description cannot be empty')
        .notEmpty()
        .isLength({ max: 255 })
        .withMessage('Description cannot exceed 255 characters'),
];