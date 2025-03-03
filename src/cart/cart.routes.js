import { Router } from "express"
import { 
    addToCart, 
    clearCart, 
    deleteCartItem, 
    getCart, 
    updateCartItem
} from "./cart.controller.js"
import { isAdmin, validateJwt } from "../../middlewares/validate.jwt.js"
import { addToCartValidator, removeCartItemValidator, updateCartItemValidator } from "../../helpers/validator.cart.js"

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
    '/:userId',
    [
        validateJwt,
        updateCartItemValidator,
        isAdmin
    ],
    updateCartItem
)

api.delete(
    '/:cartId',
    [
        validateJwt,
        removeCartItemValidator,
        isAdmin
    ],
    deleteCartItem
)

api.delete(
    '/clear/:cartId',
    [
        validateJwt,
        isAdmin
    ],
    clearCart
)

export default api