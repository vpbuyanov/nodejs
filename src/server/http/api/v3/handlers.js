import {Router} from "express";
import {
    getMainText,
    getComments,
    postAddComments,
    getMyComment,
    deleteComment, updateComment
} from '../../../../controllers/controller.js'


const handlers = Router()

handlers.get('/', getMainText)
handlers.get('/comments', getComments)
handlers.post('/comments', postAddComments)
handlers.delete('/comments/:id', deleteComment)
handlers.put('/comments/:id', updateComment)
handlers.get('/comments/:id', getMyComment)


export default handlers
