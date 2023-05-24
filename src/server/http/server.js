import path from "path";
import helmet from "helmet";
import morgan from "morgan";
import express from "express";
import bodyParser from "body-parser";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";
import handlers from "./handlers.js";
import {
    AuthorizationMiddleware,
    BadUrlMiddleware,
    errorsValidations,
    originHeaderMiddleware
} from "../../middlewares/middleware.js";
import Config from "../../../config/config.js";

const config = new Config().getServer()
const app = express()

const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info:{
            title: "Documentations",
            version: "1.0.0",
            contact: {
                name: "vpbuyanov",
                url: "https://t.me/vpbuyanov",
                email: "mors@nemors.ru",
            },
        },
        servers: [
            {
                url: `/api/v1`
            },
        ],
        tags:[
            {
                name: "API",
                description: "create and delete apikey",
            },
            {
                name: "Models",
                description: "CRUD in models",
            },
            {
                name: "Comments",
                description: "CRUD in comments",
            },
            {
                name: "Home",
                description: "Home page",
            },
        ],
        host: `${config.hosting}`,

    },
    apis: ['src/server/http/api/v3/documentations.yaml']
}

const swaggerDocs = swaggerJsDoc(swaggerOptions)

app.use(helmet())
app.use(morgan(config.morgan))

const __dirname = path.resolve()

app.use(originHeaderMiddleware)

app.use(bodyParser.json());

app.use(express.static(path.resolve(__dirname, 'public')))

app.use(
    "/api/v3",
    AuthorizationMiddleware,
    handlers
)
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs))

app.use(BadUrlMiddleware)
app.use(errorsValidations)

app.listen(config.port, () => {
    console.log(`Listening ${config.hosting}`);
});
