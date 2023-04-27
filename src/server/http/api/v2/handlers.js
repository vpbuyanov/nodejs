import {Router} from "express";
import {
    getMainText,
} from '../../../../controllers/controller.js'

const handlers = Router()

handlers.get('/', getMainText)

// handlers.post('/comments')
//
// handlers.delete('/comments/:id')
//
// handlers.put('/comments/:id')

export default handlers
