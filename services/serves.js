import {users, comments} from '../common/public.js'

export const getAllStats = (req, res) => {
    const name = req.headers['user-agent']

    if (users[name]) {
        users[name] += 1
    }else{
        users[name] = 1
    }
    res.json(users)
}

export const getMainText = (req, res) => {
    res.send('Hello')
}

export const getComments = (req, res) => {
    let data = req.body;

    if (data){
        comments.push(data)
    }

    res.send(comments)
}
