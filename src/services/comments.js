import {ObjectId} from "mongodb";

class Comments {
    async createComment(session, comment){
        return await session.collection("comments").insertOne(comment)
    }

    async getCommentByModelID(session, modelID){
        return await session.collection("comments").find( { modelID: modelID } ).project({_id: 0, text: 1}).toArray()
    }

    async getCommentByID(session, id){
        return await session.collection("comments").findOne({_id: new ObjectId(id)})
    }

    async getAllComments(session){
        return await session.collection("comments").find().toArray()
    }
}

export default Comments