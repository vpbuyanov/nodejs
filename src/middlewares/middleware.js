import Users from "../services/users.js";
import {session} from "../services/session.js";

let users = new Users()

export async function AuthorizationMiddleware(req, res, next) {
    try {
        const findKey = await users.findKey(session, req.headers["apikey"])

        if (findKey == null && req.method !== "GET" && req.url !== "/login") {
            return res.status(403).send('access denied')
        }else{
            next()
        }
    }catch (err) {
        next(err)
    }
}

export function originHeaderMiddleware(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, apikey");

    if (req.method === "OPTIONS") {
        res.status(200).send();
    }
    else {
        next();
    }
}

export function errorsValidations(err, req, res, next) {
    err.status = 500
    res.status(err.status).send(err.message)
}

export function BadUrlMiddleware(req, res) {
    res.status(404).send("No such url address")
}