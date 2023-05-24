import {session} from "../services/session.js";
import Users from "../services/users.js";

let users = new Users()

class UsersController {
    async login(req, res, next) {
        try {
            const { name } = req.body

            if (name){
                const timeCreate = Date.now();
                console.log(timeCreate)
                const api_key = name + timeCreate
                console.log(api_key)
                const data = {
                    "name": name,
                    "api_key": api_key
                }
                const response = await users.createUser(session, data)

                if (response) {
                    res.json({
                        name: response.name,
                        apiKey: response.api_key
                    });
                }
            }else{
                res.status(400).send("no sender name")
            }
        }catch (err) {
            next(err)
        }
    }

    async deleteAccount(req, res, next) {
        try {
            const apikey = req.headers['apikey']
            if (await users.deleteUserKey(session, apikey)){
                res.send('delete api-key')
            }else{
                res.status(400).send('not found api in database')
            }
        }catch (err) {
            next(err)
        }
    }

}

export default UsersController