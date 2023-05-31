import {session} from "../services/session.js";
import Users from "../services/users.js";
import {v4 as uuidv4} from "uuid";

let users = new Users()

class UsersController {
    async login(req, res, next) {
        try {
            const { name } = req.body

            if (name){
                const data = {
                    "name": name,
                    "apikey": uuidv4(),
                }
                const response = await users.createUser(session, data)

                if (response) {
                    res.status(response.status).json({
                        name: response.info.name,
                        apiKey: response.info.apikey
                    });
                }
            }
            else {
                res.status(400).send("no sender name")
            }
        } catch (err) {
            next(err)
        }
    }

    async deleteAccount(req, res, next) {
        try {
            const apikey = req.headers['apikey']
            if (await users.deleteUserKey(session, apikey)){
                res.send('delete apikey')
            }else{
                res.status(400).send('not found api in database')
            }
        }catch (err) {
            next(err)
        }
    }
}

export default UsersController