import {Router} from "express";
import {
    getAllStats,
    getMainText,
    getComments,
    postAddComments,
    getMyComment,
    deleteComment, updateComment
} from '../../../../controllers/controller.js'
import {inputValidationMiddleware} from "../../../../middlewares/middleware.js";


const handlers = Router()

handlers.get('/', getMainText)
handlers.get('/stats', inputValidationMiddleware, getAllStats)
handlers.get('/comments', getComments)
handlers.post('/comments', postAddComments)
handlers.delete('/comments/:id', deleteComment)
handlers.put('/comments/:id', updateComment)
handlers.get('/comments/:id', getMyComment)


export default handlers
