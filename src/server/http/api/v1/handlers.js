import {Router} from "express";
import {getMainText} from '../../../../controllers/mainControllers.js'


const handlers = Router()

handlers.get('/', getMainText)

export default handlers
