import { Router } from "express"
import { 
    addInvoice 
} from "./invoice.controller.js"
import { isAdmin, validateJwt } from "../../middlewares/validate.jwt.js"
import { saveInvoiceValidator } from "../../helpers/validators.js"

const api = Router()

api.post(
    '/',
    [
        validateJwt,
        saveInvoiceValidator,
        isAdmin
    ],
    addInvoice
)

export default api