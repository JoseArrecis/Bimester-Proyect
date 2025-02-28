import { Router } from "express"
import { isAdmin, validateJwt } from "../../middlewares/validate.jwt.js"
import { addToCartValidator } from "../../helpers/validator.cart.js"
import { addToCart } from "./cart.controller.js"

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

export default api