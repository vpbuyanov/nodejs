import handlers from './handlers.js';
import express from 'express';
import path from 'path';
import bodyParser from "body-parser";

const app = express()

const port = 8000
const host = '127.0.0.1'
const hosting = `http://${host}:${port}`

const __dirname = path.resolve()

app.use(bodyParser.text());

app.use(express.static(path.resolve(__dirname, 'public')))

app.use('/api/v1', handlers)

app.listen(port, host, () => {
    console.log(`Server starting on ${hosting}`)
})