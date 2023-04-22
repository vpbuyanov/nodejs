import config from "config";
import handlersv1 from './api/v1/handlers.js';
import handlersv2 from './api/v2/handlers.js';
import handlersv3 from './api/v3/handlers.js';
import express from 'express';
import path from 'path';
import bodyParser from "body-parser";
import {
    AuthorizationMiddleware,
    BadUrlMiddleware,
    myHelmet,
    myMorgan
} from "../../middlewares/middleware.js";


const app = express()

const port      = config.get('server.port')
const host      = config.get('server.host')
const hosting   = `http://${host}:${port}`

app.use(myHelmet)
app.use(myMorgan)

const __dirname = path.resolve()

app.use(bodyParser.json());

app.use(express.static(path.resolve(__dirname, 'public')))

app.use(
    "/api/v1",
    AuthorizationMiddleware,
    handlersv1
)

app.use(
    "/api/v2",
    AuthorizationMiddleware,
    handlersv2
)

app.use(
    "/api/v3",
    AuthorizationMiddleware,
    handlersv3
)

app.use(BadUrlMiddleware)

app.listen(port, () => {
    console.log(`Listening ${hosting}`);
});
