class Users {
    async createUser(session, user){
        return await session.collection("users").insertOne(user)
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

}

export default Users