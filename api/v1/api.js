import {Router} from "express";
import {getAllStats, getMainText, getComments} from './services/serves.js'

const api = Router()

api.get('/', getMainText)
api.get('/stats', getAllStats)
api.post('/comments', getComments)

export default api
