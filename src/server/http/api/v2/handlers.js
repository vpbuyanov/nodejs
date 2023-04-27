import {Router} from "express";
import {
    getMainText,
    postAddComments,
    deleteComment, updateComment
} from '../../../../controllers/controller.js'

const handlers = Router()

handlers.get('/', getMainText)


handlers.post('/comments', postAddComments)

handlers.delete('/comments/:id', deleteComment)

handlers.put('/comments/:id', updateComment)

export default handlers
