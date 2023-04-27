import {Router} from "express";
import {
    getMainText,

    deleteAccount,
    login,

    getAllModels,
    getMyModel,
    updateModel,
    deleteModel,
    createModels
} from '../../../../controllers/controller.js'

const handlers = Router()

handlers.get('/', getMainText)
handlers.get('/models', getAllModels)
handlers.get('/models/:id', getMyModel)

handlers.post('/models', createModels)
handlers.post('/login', login)

handlers.put('/models/:id', updateModel)

handlers.delete('/models/:id', deleteModel)
handlers.delete('/account/delete', deleteAccount)

export default handlers
