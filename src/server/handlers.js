import {Router} from "express";
import {getAllStats, getMainText, getComments} from '../services/service.js'
import {inputValidationMiddleware} from "../middlewares/middleware.js";

const handlers = Router()

handlers.get('/', getMainText)
handlers.get('/stats', inputValidationMiddleware,getAllStats)
handlers.post('/comments', inputValidationMiddleware, getComments)

export default handlers
