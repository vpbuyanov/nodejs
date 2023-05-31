import path from "node:path";
import helmet from "helmet";
import morgan from "morgan";
import express from "express";
import fileUpload from "express-fileupload";

import swaggerJsDoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";
import handlers from "../../routes/handlers.js";
import {
    AuthorizationMiddleware,
    BadUrlMiddleware,
    errorsValidationsMiddleware,
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
                url: `/api`
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
    apis: ['docs/documentations.yaml']
}

const swaggerDocs = swaggerJsDoc(swaggerOptions)

app.use(fileUpload({}))
app.use(helmet())
app.use(morgan(config.morgan))

app.use(express.json({
    limit: "10mb",
    type: "application/json",
}));

app.use(originHeaderMiddleware)

const __dirname = path.resolve()
app.use(express.static(path.resolve(__dirname, 'public')))

app.use(
    "/api",
    AuthorizationMiddleware,
    handlers
)
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs))

app.use(BadUrlMiddleware)
app.use(errorsValidationsMiddleware)

app.listen(config.port, () => {
    console.log(`Listening ${config.hosting}`);
});
