import { Router } from "express"
import { 
    deleteOne,
    get,
    getAll,
    updatePassword,
    updateUser
} from "./user.controller.js"
import { validateJwt } from "../../middlewares/validate.jwt.js"

const api = Router()

//Rutas privadas
api.get(
    '/',
    [validateJwt],
    getAll
)

api.get(
    '/:id',
    [validateJwt],
    get
)

api.put(
    '/:id',
    [validateJwt],
    updateUser
)

api.put(
    "/password/:id", 
    [validateJwt], 
    updatePassword
)

api.delete(
    '/:id',
    [validateJwt],
    deleteOne
)

export default api