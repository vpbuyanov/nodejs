import {Router} from "express";
import {getMainText} from '../../../../controllers/controller.js'


const handlers = Router()

handlers.get('/', getMainText)

export default handlers
