import Models from "../services/models.js";
import {session} from "../services/session.js";
import {ObjectId} from "mongodb";

let models = new Models()


class ModelsControllers {
    async createModels(req, res, next) {
        try {
            const data = req.body
            if (data.name && data.name_model && data.type && data.model && data.description){
                await models.createModel(session, data)
                res.send("creating models")
            }else{
                res.status(400).send("no valid data.\n" +
                    "Example send json {\n" +
                    "\t\"name\": \"seva\",\n" +
                    "\t\"name_model\": \"triangle\",\n" +
                    "\t\"type\": \"3d\",\n" +
                    "\t\"model\": {},\n" +
                    "\t\"description\": \"hi\",\n" +
                    "\t\"comments\": []\n" +
                    "}")
            }
        }catch (err) {
            next(err)
        }
    }

    async getAllModels(req, res, next) {
        try {
            if (await models.getAllModels(session)){
                res.send(await models.getAllModels(session))
            }else{
                res.status(400).send("no model in database")
            }
        }catch (err) {
            next(err)
        }
    }

    async getMyModel(req, res, next) {
        try {
            const id = req.params.id

            if(ObjectId.isValid(id)){
                const result = await models.getModelByID(session, id)
                result.comments = await comment.getCommentByModelID(session, id)
                res.send(result)
            }else{
                res.status(400).send("no valid id")
            }
        }catch (err) {
            next(err)
        }
    }

    async updateModel(req, res, next) {
        try {
            const data = req.body
            const id = req.params.id
            if (ObjectId.isValid(id)){
                if (data.name && data.name_model && data.type && data.model && data.descriptions && data.comments){
                    await models.updateAllModelByID(session, id, data)
                    res.send("update model")
                }else{
                    res.status(400).send("no valid data.\n" +
                        "Example send json {\n" +
                        "\t\"name\": \"seva\",\n" +
                        "\t\"name_model\": \"triangle\",\n" +
                        "\t\"type\": \"3d\",\n" +
                        "\t\"model\": {},\n" +
                        "\t\"description\": \"hi\",\n" +
                        "\t\"comments\": \"\" \n" +
                        "}")
                }
            }else{
                res.status(406).send("no valid id")
            }
        }catch (err) {
            next(err)
        }
    }

    async deleteModel(req, res, next) {
        try {
            const id = req.params.id

            if(ObjectId.isValid(id)){
                if (await models.deleteModelByID(session, req.params.id)){
                    res.send("delete model")
                }else {
                    res.status(400).send("no find model")
                }
            }else{
                res.status(406).send("no valid id")
            }
        }catch (err) {
            next(err)
        }
    }

}

export default ModelsControllers