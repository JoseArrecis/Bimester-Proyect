import { Router } from "express"
import { 
    addProduct, 
    deleteProduct, 
    getAllProducts, 
    getBestProducts, 
    getOutProducts, 
    getProductById,
    updateProduct
} from "./product.controller.js"
import { 
    isAdmin, 
    validateJwt 
} from "../../middlewares/validate.jwt.js"
import { 
    productIdValidator, 
    saveProductValidator 
} from "../../helpers/validator.product.js"

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
        productIdValidator,
        isAdmin
    ],
    getProductById
)

api.put(
    '/:id',
    [
        validateJwt,
        productIdValidator,
        isAdmin
    ],
    updateProduct
)

api.get(
    '/stock/out',
    [
        validateJwt,
        isAdmin
    ],
    getOutProducts
)

api.get(
    '/sold/top',
    [
        validateJwt,
        isAdmin
    ],
    getBestProducts
)

api.delete(
    '/:id',
    [
        validateJwt,
        productIdValidator,
        isAdmin
    ],
    deleteProduct
)
    
export default api