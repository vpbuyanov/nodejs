import {users, comments} from '../../../common/public.js'

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

export const getComments = (req, res) => {
    let data = req.body;

    if (data){
        comments.push(data)
    }

    res.send(comments)
}
