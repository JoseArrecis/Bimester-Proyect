import { Router } from "express"
import { 
    addInvoice, 
    getInvoiceByUser,
    getinvoiceDetails,
    updateInvoice
} from "./invoice.controller.js"
import { isAdmin, validateJwt } from "../../middlewares/validate.jwt.js"

const api = Router()

api.post(
    '/',
    [
        validateJwt,
        isAdmin
    ],
    addInvoice
)

api.get(
    '/user/:userId',
    [
        validateJwt,
        isAdmin
    ],
    getInvoiceByUser
)

api.get(
    '/:invoiceId/details',
    [
        validateJwt,
        isAdmin
    ],
    getinvoiceDetails
)

api.put(
    '/:invoiceId',
    [
        validateJwt,
        isAdmin
    ],
    updateInvoice
)

export default api