import { Router } from "express"
import { 
    addCategory, 
    deleteOne, 
    getAllCategories, 
    update
} from "./category.controller.js"
import { saveCategoryValidator } from "../../helpers/validators.js"
import { isAdmin, validateJwt } from "../../middlewares/validate.jwt.js"

const api = Router()

api.post(
    '/',
    [
        validateJwt,
        saveCategoryValidator,
        isAdmin
    ],  
    addCategory
)

api.get(
    '/',
    [
        validateJwt,
        isAdmin
    ],
    getAllCategories
)

api.put(
    '/:id',
    [
        validateJwt,
        isAdmin
    ],
    update
)

api.delete(
    '/:id',
    [
        validateJwt,
        isAdmin
    ],
    deleteOne
)

export default api