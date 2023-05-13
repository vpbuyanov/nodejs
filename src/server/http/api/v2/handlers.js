import {Router} from "express";
import {
    createComment,
    getMainText, getMyComment,
} from '../../../../controllers/controller.js'

const handlers = Router()

handlers.get('/', getMainText)
handlers.get('/comments/:id', getMyComment)

handlers.post('/comments', createComment)


export default handlers
