import helmet from "helmet";
import morgan from "morgan"
import {GetApiKeys} from "../services/service.js";
import Config from "../../config/config.js";
import swaggerJsDoc from "swagger-jsdoc";

const config = new Config().getServer()

export async function AuthorizationMiddleware(req, res, next) {
    try {
        const keys = await GetApiKeys()
        if (keys.status){
            next(keys.status)
        }
        if (keys) {
            if (!keys.includes(req.headers["apikey"]) && req.method !== "GET" && req.url !== "/login") {
                return res.status(403).send('access denied')
            }else{
                next()
            }
        }else{
            res.send('not apikey in databases')
        }
    }catch (err) {
        next(err)
    }
}

export function inputValidationMiddleware(req, res, next) {
    const userInput = req.body;

    const regex = /[@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g;
    const containsSpecialChars = regex.test(userInput);

    if (containsSpecialChars) {
        return res.status(400).send("no valid data")
    }

    next();
}

export function errorsValidations(err, req, res, next) {
    err.status = 500
    res.status(err.status).send(err.message)
}

export function BadUrlMiddleware(req, res) {
    res.status(404).send("No such url address")
}

export const myHelmet = helmet()
export const myMorgan = morgan(config.morgan)

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
                url: `${config.hosting}/api/v3`
            },
            {
                url: `${config.hosting}/api/v2`
            },
            {
                url: `${config.hosting}/api/v1`
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

export const swaggerDocs = swaggerJsDoc(swaggerOptions)
