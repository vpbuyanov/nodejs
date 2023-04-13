import config from "config";
import handlers from './handlers.js';
import express from 'express';
import path from 'path';
import bodyParser from "body-parser";
import {
    AuthorizationMiddleware,
    BadUrlMiddleware,
    myHelmet,
    myMorgan
} from "../middlewares/middleware.js";

const app = express()

const port      = config.get('server.port')
const host      = config.get('server.host')
const hosting   = `http://${host}:${port}`

app.use(myHelmet)
app.use(myMorgan)

const __dirname = path.resolve()

app.use(bodyParser.text());

app.use(express.static(path.resolve(__dirname, 'public')))

app.use(
    "/api/v1",
    AuthorizationMiddleware,
    handlers
)

app.use(BadUrlMiddleware)

app.listen(port, host, () => {
    console.log(`Server starting on ${hosting}`)
})