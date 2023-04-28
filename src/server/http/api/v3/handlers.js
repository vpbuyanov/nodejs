import {Router} from "express";
import {
    getMainText,

    deleteAccount,
    login,

    getAllModels,
    getMyModel,
    updateModel,
    deleteModel,
    createModels, createComment, getComment, getMyComment
} from '../../../../controllers/controller.js'

const handlers = Router()


handlers.get('/', getMainText)
handlers.get('/comments', getComment)
handlers.get('/comments/:id', getMyComment)
handlers.get('/models', getAllModels)
handlers.get('/models/:id', getMyModel)

handlers.post('/comments', createComment)
handlers.post('/models', createModels)
handlers.post('/login', login)

handlers.put('/models/:id', updateModel)

handlers.delete('/models/:id', deleteModel)
handlers.delete('/account/delete', deleteAccount)

export default handlers
