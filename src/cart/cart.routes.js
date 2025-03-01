import { Router } from "express"
import { 
    addToCart, 
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
    '/:id',
    [
        validateJwt,
        updateCartItemValidator,
        isAdmin
    ],
    updateCartItem
)

api.delete(
    '/:cartId/item/:itemId',
    [
        validateJwt,
        removeCartItemValidator,
        isAdmin
    ],
    deleteCartItem
)

export default api