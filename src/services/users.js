class Users {
    async createUser(session, user) {
        const foundUser = await this.getUserKey(session, user.name);

        let returnRes = null;

        if (!foundUser) {
            const insertedUser = await session.collection("users").insertOne(user);

            if (insertedUser) {
                returnRes = await this.getUserKey(session, user.name);
            }
        }
        else {
            returnRes = foundUser;
        }

        return returnRes;
    }

    async findKey(session, apikey) {
        const findKey = await session.collection("users").findOne({apikey: apikey})
        if (findKey){
            return findKey
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
        return await session.collection("users").findOne({name: userName})
    }
}

export default Users