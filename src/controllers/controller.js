import {GetAllComments, AddComments, FindComment, UpdateComment, DeleteComment} from "../services/service.js";
import {ObjectId} from 'mongodb'

let users = {}

export const getMainText = (req, res) => {
    res.send('Hello')
}

export const getAllStats = (req, res) => {
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

export async function getComments(req, res){
    res.status(200).send(await GetAllComments())
}

export async function getMyComment(req, res){
    if (ObjectId.isValid(req.params.id)){
        const result = await FindComment(req.params.id)
        res.status(200).send(result)
    }else{
        res.status(400).send("id param is not valid")
    }
}

export function postAddComments(req, res){
    const {name, text} = req.body;

    if (name && text){

        AddComments({name, text}).then(() => {
            res.status(200).send("data send")
        })
    }else{
        res.status(400).send("Error: No data input")
    }
}

export async function deleteComment(req, res){
    if (ObjectId.isValid(req.params.id)){
        await DeleteComment(req.params.id)
        res.send("comment delete")
    }else{
        res.send("id param is not valid")
    }
}

export async function updateComment(req, res){
    const {name, text} = req.body

    if(ObjectId.isValid(req.params.id)){
        if(name && text){
            await UpdateComment(req.params.id, name, text)
            res.send("update data")
        }else{
            res.send("no data valid")
        }
    }else{
        res.send("id param is not valid")
    }
}


