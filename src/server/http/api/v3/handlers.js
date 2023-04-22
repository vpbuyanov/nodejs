import {Router} from "express";
import {
    getMainText,
    getComments,
    postAddComments,
    getMyComment,
} from '../../../../controllers/controller.js'


const handlers = Router()

handlers.get('/', getMainText)
handlers.get('/comments', getComments)
handlers.get('/comments/:id', getMyComment)


handlers.post('/comments', postAddComments)
handlers.post('login', (req, res) => {
    res.send("hello")
})


export default handlers
