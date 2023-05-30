import Users from "../services/users.js";
import {session} from "../services/session.js";
import {ObjectId} from "mongodb";

let users = new Users()

export async function AuthorizationMiddleware(req, res, next) {
    try {
        const keys = await users.getUserKeys(session)
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