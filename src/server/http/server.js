import path from "node:path";
import helmet from "helmet";
import morgan from "morgan";
import express from "express";
import fileUpload from "express-fileupload";

import swaggerJsDoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";

import handlersv1 from "./api/v1/handlers.js";
import handlersv2 from "./api/v2/handlers.js";
import handlersv3 from "./api/v3/handlers.js";
import {
    AuthorizationMiddleware,
    BadUrlMiddleware, errorsValidations
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
                url: `/api/v3`
            },
            {
                url: `/api/v2`
            },
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

app.use(fileUpload({}))
app.use(helmet())
app.use(morgan(config.morgan))

app.use(express.json({
    limit: "10mb",
    type: "application/json",
}));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, apikey");

    // Todo вынести в отдельный Middleware
    if (req.method === "OPTIONS") {
        res.status(200).send();
    }
    else {
        next();
    }
})

const __dirname = path.resolve()
app.use(express.static(path.resolve(__dirname, 'public')))

// app.use(
//     "/api/v1",
//     AuthorizationMiddleware,
//     handlersv1
// )
//
// app.use(
//     "/api/v2",
//     AuthorizationMiddleware,
//     handlersv2
// )

app.use(
    "/api",
    AuthorizationMiddleware,
    handlersv3
)
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs))

app.use(BadUrlMiddleware)
app.use(errorsValidations)

app.listen(config.port, config.host, () => {
    console.log(`Listening ${config.hosting}`);
});
