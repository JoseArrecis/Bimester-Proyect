import { Router } from "express"
import { 
    login, 
    register 
} from "./auth.controller.js"
import { loginValidator, registerValidator } from "../../helpers/validators.js"
import { deleteFileOnError } from "../../middlewares/delete.file.on.error.js"
import { uploadProfilePicture } from "../../middlewares/multer.uploads.js"

const api = Router()

api.post(
    '/register',
    [
        uploadProfilePicture.single('profilePicture'),
        registerValidator,
        deleteFileOnError
    ],
    register
)

api.post(
    '/login',
    [
        loginValidator
    ],
    login
)

export default api