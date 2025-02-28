import { Router } from "express"
import { 
    addProduct, 
    getAllProducts, 
    getProductById
} from "./product.controller.js"
import { 
    isAdmin, 
    validateJwt 
} from "../../middlewares/validate.jwt.js"
import { saveProductValidator } from "../../helpers/validators.js"

const api = Router()

api.post(
    '/',
    [
        validateJwt,
        saveProductValidator,
        isAdmin
    ],
    addProduct
)

api.get(
    '/',
    [
        validateJwt,
        isAdmin
    ],
    getAllProducts
)

api.get(
    '/:id',
    [
        validateJwt,
        isAdmin
    ],
    getProductById
)

export default api