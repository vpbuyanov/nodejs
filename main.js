import api from './api/v1/api.js';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import bodyParser from "body-parser";

function middleware(req, res, next){
    if (req.headers['apikey'] === "secret"){
        next()
    }else{
        res.send("LOL")
    }
}

const app = express()

const port = 8000
const host = '127.0.0.1'
const hosting = `http://${host}:${port}`

const __dirname = path.resolve()

app.use(bodyParser.text());

app.use(express.static(path.resolve(__dirname, 'public')))

app.use('/api/v1', middleware, api)

app.listen(port, host, () => {
    console.log(`Server starting on ${hosting}`)
})