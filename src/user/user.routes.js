import { Router } from "express"
import { 
    deleteOne,
    get,
    getAll,
    updatePassword,
    updateUser
} from "./user.controller.js"
import { validateJwt } from "../../middlewares/validate.jwt.js"
import { 
    updatePasswordValidator, 
    updateUserValidator, 
    userIdValidator 
} from "../../helpers/validator.user.js"

const api = Router()

//Rutas privadas
api.get(
    '/',
    [
        validateJwt,

    ],
    getAll
)

api.get(
    '/:id',
    [
        validateJwt,
        userIdValidator
    ],
    get
)

api.put(
    '/:id',
    [
        validateJwt,
        updateUserValidator
    ],
    updateUser
)

api.put(
    "/password/:id", 
    [
        validateJwt,
        updatePasswordValidator
    ], 
    updatePassword
)

api.delete(
    '/:id',
    [
        validateJwt
    ],
    deleteOne
)

export default api