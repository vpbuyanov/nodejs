import Comments from "../services/comments.js";
import {session} from "../services/session.js";
import {ObjectId} from "mongodb";

let comment = new Comments()

class CommentsControllers {
    async createComment(req, res, next) {
        try {
            const data = req.body
            if (data.name && data.text && data.modelID){
                await comment.createComment(session, data)
                res.send("comments create")
            }else{
                res.status(400).send("not data valid. Please send json {'name': 'yourName', 'text': 'textYourComment', 'modelID': 'yourModelID'}")
            }
        }catch (err) {
            next(err)
        }
    }

    async getComments(req, res, next) {
        try {
            if (await comment.getAllComments(session)){
                res.send(await comment.getAllComments(session))
            }else{
                res.status(400).send("no comment in database")
            }
        }catch (err) {
            next(err)
        }
    }

    async getMyComment(req, res, next) {
        try {
            const id = req.params.id

            if(ObjectId.isValid(id)){
                if (await comment.getCommentByID(session, id)) {
                    res.send(await comment.getCommentByID(session, id))
                }else{
                    res.status(400).send("no valid data")
                }
            }else{
                res.status(406).send("no valid id")
            }
        }catch (err) {
            next(err)
        }
    }

}

export default CommentsControllers