import {Router} from "express";
import {getAllStats, getComment, getMainText} from '../../../../controllers/controller.js'
import {inputValidationMiddleware} from "../../../../middlewares/middleware.js";


const handlers = Router()

handlers.get('/', getMainText)
handlers.get('/stats', inputValidationMiddleware, getAllStats)
handlers.post('/comments', inputValidationMiddleware, getComment)

export default handlers
