import {
    Create,
    ReadAll,
    ReadOne,
    Update,
    Delete
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

export async function postAddComments(req, res){
    const data = req.body;

    if (data.name && data.text){
        await Create("comments", data)
        res.status(200).send("add comments")
    }else{
        res.status(400).send("Error: No data input")
    }
}

export async function getComments(req, res){
    res.status(200).send(await ReadAll('comments'))
}

export async function getMyComment(req, res){
    if (ObjectId.isValid(req.params.id)){
        const result = await ReadOne('comments', req.params.id)
        res.status(200).send(result)
    }else{
        res.status(400).send("id param is not valid")
    }
}

export async function deleteComment(req, res){
    if (ObjectId.isValid(req.params.id)){
        await Delete('comments', req.params.id)
        res.send("comment delete")
    }else{
        res.status(400).send("id param is not valid")
    }
}

export async function updateComment(req, res){
    const {name, text} = req.body

    if(ObjectId.isValid(req.params.id)){
        if(name && text){
            await Update('comments', req.params.id, name, text)
            res.send("update data")
        }else{
            res.status(400).send("no data valid")
        }
    }else{
        res.status(400).send("id param is not valid")
    }
}

export async function login(req, res) {
    const { name } = req.body

    if (name){
        const number = getRandomInt(1000)
        const api_key = name + number
        const data = {
            "name": name,
            "api_key": api_key
        }

        await Create('users', data)
        res.send("you are successfully registered")
    }else{
        res.status(400).send("no sender name")
    }
}

export async function deleteAccount(req, res) {
    const id = req.params.id

    if(ObjectId.isValid(id)){
        await Delete('users', id)
        res.send("account deleted")
    }else{
        res.status(400).send("no valid id")
    }
}

export async function getAllModels(req, res) {
    res.send(await ReadAll('models'))
}

export async function getMyModel(req, res) {
    const id = req.params.id

    if(ObjectId.isValid(id)){
        res.send(await ReadAll('models', req.params.id))
    }else{
        res.status(400).send("no valid id")
    }
}

export async function createModels(req, res) {
    const data = req.body
    await Create('models', data)
    res.send("creating models")
}

export async function updateModel(req, res){
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

}

export async function deleteModel(req, res) {
    const id = req.params.id

    if(ObjectId.isValid(id)){
        await Delete('models', req.params.id)
        res.send("delete model")
    }else{
        res.status(400).send("no valid id")
    }
}
