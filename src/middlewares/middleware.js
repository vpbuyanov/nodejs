import config from "config";
import helmet from "helmet";
import morgan from "morgan"


export function AuthorizationMiddleware(req, res, next) {
    if (req.headers["api-key"] !== config.get('middleware.api_key')  && req.method !== "GET" && req.url !== "/login"){
        return res.status(403).send("Access Denied!")
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
export const myMorgan = morgan(config.get('middleware.morgan'))