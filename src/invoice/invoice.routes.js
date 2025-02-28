import { Router } from "express"
import { 
    addInvoice 
} from "./invoice.controller"
import { isAdmin, validateJwt } from "../../middlewares/validate.jwt"

const api = Router

api.post(
    '/',
    [
        validateJwt,
        isAdmin
    ],
    addInvoice
)