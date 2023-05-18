import {ObjectId} from 'mongodb'
import Models from "../services/models.js";
import Comments from "../services/comments.js";
import Users from "../services/users.js";
import {session} from "../services/session.js";

let models = new Models()
let comment = new Comments()
let users = new Users()


function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

export function getMainText(req, res){
    res.send('Hello')
}

export async function createComment(req, res, next) {
    try {
        const data = req.body
        if (data.name && data.text){
            await comment.createComment(session, data)
            res.send("comments create")
        }else{
            res.status(400).send("not data valid. Please send json {'name': 'yourName', 'text': 'textYourComment'}")
        }
    }catch (err) {
        next(err)
    }
}

export async function getComments(req, res, next) {
    try {
        if (await comment.getAllComments(session)){
            res.send(await comment.getAllComments(session))
        }else{
            res.status(400).send("no comment in database")
        }
    }catch (err) {
        next(err)
    }
}

export async function getMyComment(req, res, next) {
    try {
        const id = req.params.id

        if(ObjectId.isValid(id)){
            if (await comment.getCommentByID(session, id)) {
                res.send(await comment.getCommentByID(session, id))
            }else{
                res.status(400).send("no valid data")
            }
        }else{
            res.status(406).send("no valid id")
        }
    }catch (err) {
        next(err)
    }
}

export async function login(req, res, next) {
    try {
        const { name } = req.body

        if (name){
            const number = getRandomInt(1000)
            const api_key = name + number
            const data = {
                "name": name,
                "api_key": api_key
            }
            const response = await users.createUser(session, data)

            if (response) {
                res.json({
                    name: response.name,
                    apiKey: response.api_key
                });
            }
        }else{
            res.status(400).send("no sender name")
        }
    }catch (err) {
        next(err)
    }
}

export async function deleteAccount(req, res, next) {
    try {
        const apikey = req.headers['apikey']
        if (await users.deleteUserKey(session, apikey)){
            res.send('delete api-key')
        }else{
            res.status(400).send('not found api in database')
        }
    }catch (err) {
        next(err)
    }

}

export async function createModels(req, res, next) {
    try {
        const data = req.body
        if (data.name && data.name_model && data.type && data.model && data.description){
            await models.createModel(session, data)
            res.send("creating models")
        }else{
            res.status(400).send("no valid data.\n" +
                "Example send json {\n" +
                "\t\"name\": \"seva\",\n" +
                "\t\"name_model\": \"triangle\",\n" +
                "\t\"type\": \"3d\",\n" +
                "\t\"model\": {},\n" +
                "\t\"description\": \"hi\",\n" +
                "\t\"comments\": []\n" +
                "}")
        }
    }catch (err) {
        next(err)
    }
}

export async function getAllModels(req, res, next) {
    try {
        if (await models.getAllModels(session)){
            res.send(await models.getAllModels(session))
        }else{
            res.status(400).send("no model in database")
        }
    }catch (err) {
        next(err)
    }
}

export async function getMyModel(req, res, next) {
    try {
        const id = req.params.id

        if(ObjectId.isValid(id)){
            res.send(await models.getModelByID(session, id))
        }else{
            res.status(400).send("no valid id")
        }
    }catch (err) {
        next(err)
    }
}

export async function updateModel(req, res, next) {
    try {
        const data = req.body
        const id = req.params.id
        if (ObjectId.isValid(id)){
            if (data.name && data.name_model && data.type && data.model && data.descriptions && data.comments){
                await models.updateAllModelByID(session, id, data)
                res.send("update model")
            }else{
                res.status(400).send("no valid data.\n" +
                    "Example send json {\n" +
                    "\t\"name\": \"seva\",\n" +
                    "\t\"name_model\": \"triangle\",\n" +
                    "\t\"type\": \"3d\",\n" +
                    "\t\"model\": {},\n" +
                    "\t\"description\": \"hi\",\n" +
                    "\t\"comments\": \"\" \n" +
                    "}")
            }
        }else{
            res.status(406).send("no valid id")
        }
    }catch (err) {
        next(err)
    }
}

export async function deleteModel(req, res, next) {
    try {
        const id = req.params.id

        if(ObjectId.isValid(id)){
            if (await models.deleteModelByID(session, req.params.id)){
                res.send("delete model")
            }else {
                res.status(400).send("no find model")
            }
        }else{
            res.status(406).send("no valid id")
        }
    }catch (err) {
        next(err)
    }
}
