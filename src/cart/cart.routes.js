import { Router } from "express"
import { 
    addToCart, 
    getCart, 
    updateCartItem
} from "./cart.controller.js"
import { isAdmin, validateJwt } from "../../middlewares/validate.jwt.js"
import { addToCartValidator, updateCartItemValidator } from "../../helpers/validator.cart.js"

const api = Router()

api.post(
    '/',
    [
        validateJwt,
        addToCartValidator,
        isAdmin
    ],
    addToCart
)

api.get(
    '/:userId',
    [
        validateJwt,
        isAdmin
    ],
    getCart
)

api.put(
    '/:id',
    [
        validateJwt,
        updateCartItemValidator,
        isAdmin
    ],
    updateCartItem
)

export default api