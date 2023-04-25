import helmet from "helmet";
import morgan from "morgan"
import Config from "../../config/config.js";
import {getApiKeys} from "../services/service.js";

const config = new Config()

export async function AuthorizationMiddleware(req, res, next) {
    const keys = await getApiKeys()
    if (!keys.includes(req.headers["apikey"]) && req.method !== "GET" && req.url !== "/login") {
        return res.status(403).send('you do not have access')
    }
    next()
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

export function BadUrlMiddleware(req, res) {
    res.status(400).send("No such url address")
}

export const myHelmet = helmet()
export const myMorgan = morgan(config.getServer().morgan)
