const http = require("node:http");

const host = '127.0.0.1';
const port = 8000
const hosting = `http://${host}:${port}`

const comments = ['is', 'are']
let users = {}

function badRequest(res){
    res.writeHead(400)
    res.write("bad request")
    res.end()
}

const requestListener = function (req, res) {
    const method = req.method
    const url = req.url
    const name = req.headers['user-agent']

    switch (url){
        case "/":
            if (method === "GET"){
                res.writeHead(200, {'Content-Type': 'text/plain'})
                res.write(`hello ${name} \n${hosting}`)
                res.end()
            }else{
                badRequest(res)
            }
            break;
        case "/comments":
            if (method === "POST"){
                res.writeHead(200, {'Content-Type': 'text/plain'})

                let data = ''
                req.on('data', (chunk) => {
                    data += chunk
                })
                req.on('end', () => {
                    comments.push(data)

                    res.write(JSON.stringify(comments))
                    res.end()
                })
            }else{
                badRequest(res)
            }
            break;
        case "/stats":
            if (method === "GET"){
                res.writeHead(200, {'Content-Type': 'text/html'})
                let data = ''
                req.on('data', (chunk) => {
                    data += chunk
                })
                req.on('end', () => {
                    if (users[name]){
                        users[name] += 1
                    }else{
                        users[name] = 1
                    }
                    let myHtml =
                        '<table>'+
                            '<tr>' +
                                '<td>Name</td>' +
                                '<td>Count request</td>' +
                            '</tr>' +
                            '<tr>'+
                                '<td>' + name + '</td>' +
                                '<td>' + users[name] + '</td>' +
                            '</tr>' +
                        '</table>'
                    res.write(myHtml)
                    res.end()
                })
            }else{
                badRequest(res)
            }
            break;
        default:
            badRequest(res)
            break;
    }
};

const server = http.createServer(requestListener);

server.listen(port, host, () => {
    console.log(`Server is running on ${hosting}`)
});
