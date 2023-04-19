import {connDB, getDb} from "../../config/connDB.js";
import {getAllComments, addComments, findComment} from "../services/service.js";
import {ObjectId} from 'mongodb'

let db;

connDB((err) => {
    if (!err) {
        db = getDb();
    }else{
        console.log(`DB connection error: ${err}`);
    }
})

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
    res.status(200).send(await getAllComments(db))
}

export async function getMyComments(req, res){
    if (ObjectId.isValid(req.params.id)){
        const result = await findComment(db, req.params.id)
        res.status(200).send(result)
    }else{
        res.status(400).send("id param is not valid")
    }
}

export async function postAddComments(req, res){
    const {name, text} = req.body;

    if (name && text){

        addComments(db, {name, text}).then(() => {
            res.status(200).send("data send")
        })
    }else{
        res.status(400).send("Error: No data input")
    }
}
