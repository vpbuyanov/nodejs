import {ObjectId} from 'mongodb'
import Models from "../services/models.js";
import Comments from "../services/comments.js";
import Users from "../services/users.js";
import {session} from "../services/session.js";
import { v4 as uuidv4 } from 'uuid';
 import imgbbUploader from "imgbb-uploader";

import Config from "./../../config/config.js";

const config = new Config();

let models = new Models()
let comment = new Comments()
let users = new Users()

export function getMainText(req, res){
    res.send('Hello')
}

export async function createComment(req, res, next) {
    try {
        const data = req.body
        if (data.name && data.text && data.modelID){
            await comment.createComment(session, data)
            res.send("comments create")
        }else{
            res.status(400).send("not data valid. Please send json {'name': 'yourName', 'text': 'textYourComment', 'modelID': 'yourModelID'}")
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
            const data = {
                "name": name,
                "api_key": uuidv4(),
            }
            const response = await users.createUser(session, data)

            if (response) {
                res.status(response.status).json({
                    name: response.info.name,
                    apiKey: response.info.api_key
                });
            }
        }else{
            res.status(400).send("no sender name")
        }
    } catch (err) {
        next(err)
    }
}

export async function deleteAccount(req, res, next) {
    try {
        const apikey = req.headers['apikey'];
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
    // Some promise of base64 data
    const bufferToBase64 = (buffer) => {
        return new Promise((resolve) => {
            const buff = new Buffer.from(buffer);
            const base64string = buff.toString("base64"); // https://nodejs.org/api/buffer.html#buftostringencoding-start-end
            resolve(base64string);
        });
    }

    try {
        const data = req.body;
        let file = null;

        if (req.files) {
            file = req.files.file;
        }

        console.log("file", file);
        console.log("body", data);

        if (data.name && data.name_model && data.type && data.model) {
            const modelImages = {
                'full': null,
                'thumb': null,
                'medium': null,
                deleteLink: null,
            };

            const date = new Date();

            // ставим дату у модели
            data.time_create = date;
            data.time_updated = date;

            if (file) {
                console.log("есть файлы", file);
                delete data.file;

                const imgBB_ApiKey = config.getImgBBApiKey();
                const imageBase64 = await bufferToBase64(file.data);

                const image = await imgbbUploader({
                    apiKey: imgBB_ApiKey,
                    base64string: imageBase64,
                    name: `model_${data.type}_${data.name_model}_${data.name}`,
                })
                    .then((res) => {
                        console.log(`Handle success: ${res.url}`);
                        modelImages.thumb = res.thumb.url;
                        modelImages.full = res.url;
                        modelImages.medium = res.medium.url;
                        modelImages.deleteLink = res.delete_url;

                        return res.url;
                    })
                    .catch((e) => {
                        console.error(`Handle error: ${e}`);
                        res.status(500).send("Ошибки при сохранении картинки")
                        return "http://placekitten.com/300/300";
                    });
            }

            data.images = modelImages;

            const createResponse = await models.createModel(session, data);

            if (createResponse.insertedId) {
                res.status(201).json(createResponse.insertedId);
            }
        }
        else {
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
    } catch (err) {
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
            const result = await models.getModelByID(session, id)
            result.comments = await comment.getCommentByModelID(session, id)
            res.send(result)
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
            const deleteResponse = await models.deleteModelByID(session, req.params.id);

            if (deleteResponse.deletedCount === 1){
                res.send(deleteResponse);
            }else {
                res.status(404).send("model not found")
            }
        }else{
            res.status(406).send("no valid id")
        }
    }catch (err) {
        next(err)
    }
}
