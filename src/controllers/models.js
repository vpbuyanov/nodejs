import Models from "../services/models.js";
import {session} from "../services/session.js";
import {ObjectId} from "mongodb";
import Comments from "../services/comments.js";
import imgbbUploader from "imgbb-uploader";
import Config from "./../../config/config.js";

const config = new Config();
let models = new Models()
let comments = new Comments()


class ModelsControllers {
    async createModels(req, res, next) {
        const bufferToBase64 = (buffer) => {
            return new Promise((resolve) => {
                const buff = new Buffer.from(buffer);

                // https://nodejs.org/api/buffer.html#buftostringencoding-start-end
                const base64string = buff.toString("base64");
                resolve(base64string);
            });
        }

        try {
            const data = req.body;
            let file = null;

            if (req.files) {
                file = req.files.file;
            }

            if (data.name && data.name_model && data.type && data.model) {
                const modelImages = {
                    'full': null,
                    'thumb': null,
                    'medium': null,
                    deleteLink: null,
                };

                const date = new Date();

                // ставим дату у модели
                data.time_create = date;
                data.time_updated = date;

                if (file) {
                    // удаляем у объекта, который грузится в БД
                    delete data.file;

                    const imgBB_ApiKey = config.getImgBBApiKey();
                    const imageBase64 = await bufferToBase64(file.data);

                    const image = await imgbbUploader({
                        apiKey: imgBB_ApiKey,
                        base64string: imageBase64,
                        name: `model_${data.type}_${data.name_model}_${data.name}`,
                    })
                        .then((res) => {
                            console.log(`Handle success: ${res.url}`);
                            modelImages.thumb = res.thumb.url;
                            modelImages.full = res.url;
                            modelImages.medium = res.medium.url;
                            modelImages.deleteLink = res.delete_url;

                            return res.url;
                        })
                        .catch((e) => {
                            console.error(`Handle error: ${e}`);
                            res.status(500).send("Ошибки при сохранении картинки")
                            return "http://placekitten.com/300/300";
                        });
                }

                data.images = modelImages;

                const createResponse = await models.createModel(session, data);

                if (createResponse.insertedId) {
                    res.status(201).json(createResponse.insertedId);
                }
            }
            else{
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
                res.status(404).send("Моделей нет. Создайте первую!")
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
                result.comments = await comments.getCommentByModelID(session, id)
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
            const model = req.body
            const id = req.params.id
            if (ObjectId.isValid(id)){
                if (model.name_model || model.type || model.model || model.description || model.comments){
                    await models.updateAllModelByID(session, id, model)
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
                const deleteResponse = await models.deleteModelByID(session, req.params.id);

                if (deleteResponse.deletedCount === 1) {
                    res.send(deleteResponse);
                }else {
                    res.status(404).send("Модель не найдена")
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