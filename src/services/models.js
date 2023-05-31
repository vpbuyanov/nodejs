import {ObjectId} from "mongodb";

class Models {
    async createModel(session, model){
        return await session.collection("models").insertOne(model)
    }

    async getModelByID(session, id){
        return await session.collection("models").findOne({_id: new ObjectId(id)})
    }

    async getAllModels(session){
        return await session.collection("models").find().project({name_model: 1, images: 1}).toArray()
    }

    async updateAllModelByID(session, id, model){
        if (await session.collection("models").findOne({_id: new ObjectId(id)})) {
            return await session.collection("models").updateOne({_id: new ObjectId(id)}, {$set: model})
        }else{
            return null
        }
    }

    async deleteModelByID(session, id){
        if (await session.collection("models").findOne({_id: new ObjectId(id)})) {
            return await session.collection("models").deleteOne({_id: new ObjectId(id)})
        }else{
            return null
        }
    }

}

export default Models