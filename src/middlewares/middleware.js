import {myConfig} from "../../config.js"
import helmet from "helmet";
import morgan from "morgan"

export function AuthorizationMiddleware(req, res, next) {
    if (req.headers["api-key"] !== myConfig.middleware.api_key && req.method !== "GET"){
        return res.send(403, "Access Denied!")
    }
    next()
}

export function inputValidationMiddleware(req, res, next) {
    const userInput = req.body;

    const regex = /[@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g;
    const containsSpecialChars = regex.test(userInput);

    if (containsSpecialChars) {
        return res.send(400, "no valid data")
    }

    next();
}

export function BadUrlMiddleware(req, res) {
    res.send(400, "No such url address")
}

export const myHelmet = helmet()
export const myMorgan = morgan(myConfig.middleware.morgan)