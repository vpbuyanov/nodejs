import {
    Create,
    Update,
    Delete,
    DeleteApiKey,
    FindToId
} from "../services/service.js";
import {ObjectId} from 'mongodb'

let users = {}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

export function getMainText(req, res){
    res.send('Hello')
}

export function getAllStats(req, res) {
    const name = req.headers['user-agent']
    let firstHtml =
        '<table>' +
            '<tr>' +
                '<td>Name</td>' +
                '<td>Count request</td>' +
            '</tr>'
    let secondHtml = ''

    if (users[name]) {
        users[name] += 1
    }else{
        users[name] = 1
    }
    for (const key in users) {
        secondHtml +=
            `<tr>
                <td>${key}</td>
                <td>${users[key]}</td>
            </tr>`
    }
    let resHtml = firstHtml + secondHtml + '</table>'
    res.send(resHtml)
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

            await Create('users', data)
            res.send(`you are successfully registered, your api_key: ${api_key}`)
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
        if (await DeleteApiKey(apikey)){
            res.send('delete api-key')
        }else{
            res.status(400).send('not found api in database')
        }
    }catch (err) {
        next(err)
    }

}

export async function getAllModels(req, res, next) {
    try {
        if (await FindToId('models', {}, {name: 1})){
            res.send(await FindToId('models', {}, {name: 1}))
        }else{
            res.status(400).send('no model in database')
        }
    }catch (err) {
        next(err)
    }
}

export async function getMyModel(req, res, next) {
    try {
        const id = req.params.id

        if(ObjectId.isValid(id)){
            res.send(await FindToId('models', {}, {}, false, req.params.id))
        }else{
            res.status(400).send("no valid id")
        }
    }catch (err) {
        next(err)
    }
}

export async function createModels(req, res, next) {
    try {
        const data = req.body
        if (data.name && data.name_model && data.type && data.model && data.description && data.comments){
            await Create('models', data)
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

export async function updateModel(req, res, next) {
    try {
        const data = req.body
        const id = req.params.id
        if (ObjectId.isValid(id)){
            if (data.name && data.name_model && data.type && data.model && data.description && data.comments){
                await Update('models', id, data)
                res.send("update model")
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
        }else{
            res.status(400).send("no valid id")
        }
    }catch (err) {
        next(err)
    }
}

export async function deleteModel(req, res, next) {
    try {
        const id = req.params.id

        if(ObjectId.isValid(id)){
            if (await Delete('models', req.params.id)){
                res.send("delete model")
            }else {
                res.status(400).send("no find model")
            }
        }else{
            res.status(400).send("no valid id")
        }
    }catch (err) {
        next(err)
    }
}
