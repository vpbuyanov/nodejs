import {Router} from "express";
import { getMainText } from '../../../controllers/mainControllers.js'
import UsersController from "../../../controllers/users.js";
import ModelsControllers from "../../../controllers/models.js";
import CommentsControllers from "../../../controllers/comments.js";

const handlers = Router()
const user = new UsersController()
const modal = new ModelsControllers()
const comment = new CommentsControllers()

handlers.get('/', getMainText)
handlers.get('/comments', comment.getComments)
handlers.get('/comments/:id', comment.getMyComment)
handlers.get('/models', modal.getAllModels)
handlers.get('/models/:id', modal.getMyModel)

handlers.post('/comments', comment.createComment)
handlers.post('/models', modal.createModels)
handlers.post('/login', user.login)

handlers.put('/models/:id', modal.updateModel)

handlers.delete('/models/:id', modal.deleteModel)
handlers.delete('/account/delete', user.deleteAccount)

export default handlers
