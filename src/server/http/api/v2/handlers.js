import {Router} from "express";
import {
    createComment, getAllStats,
    getComment,
    getMainText, getMyComment,
} from '../../../../controllers/controller.js'

const handlers = Router()

handlers.get('/', getMainText)
handlers.get('/comments', getComment)
handlers.get('/comments/:id', getMyComment)

handlers.post('/comments', createComment)
handlers.post('/stats', getAllStats)


export default handlers
