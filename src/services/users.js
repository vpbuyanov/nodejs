class Users {
    async createUser(session, user) {
        const foundUser = await this.getUserKey(session, user.name);

        let returnRes = null;

        if (!foundUser) {
            const insertedUser = await session.collection("users").insertOne(user);

            if (insertedUser) {
                returnRes = {
                    info: await this.getUserKey(session, user.name),
                    status: 201,
                };
            }
        }
        else {
            returnRes = {
                info: foundUser,
                status: 200,
            };
        }

        return returnRes;
    }

    async getUserKeys(session) {
        const keys = []
        let objectKeys = await session.collection("users").find().toArray()
        objectKeys.forEach(element => keys.push(element.api_key))
        if (keys){
            return keys
        }else{
            return null
        }
    }

    async deleteUserKey(session, apikey){
        let object = await session.collection("users").findOne({"api_key": apikey})
        if (object){
            return await session.collection("users").deleteOne({"api_key": apikey})
        }else{
            return null
        }
    }

    async getUserKey(session, userName) {
        return await session.collection("users").findOne({
            name: userName
        });
    }
}

export default Users