import {Router} from "express";
import {getAllStats, getMainText, getComments} from '../services/service.js'

const handlers = Router()

handlers.get('/', getMainText)
handlers.get('/stats', getAllStats)
handlers.post('/comments', getComments)

export default handlers
