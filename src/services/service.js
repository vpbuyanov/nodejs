import {ObjectId} from "mongodb"
import {connDB, getDb} from "../../config/connDB.js";

let db;

connDB((err) => {
    if (!err) {
        db = getDb();
    }else{
        console.log(`DB connection error: ${err}`);
    }
})

export async function addComments(data){
    const comments = db.collection("comments")
    await comments.insertOne(data)
}

export async function getAllComments(){
    const comments  = db.collection("comments")
    const result    = await comments.find()

    return  result.toArray()
}

export async function findComment(id){
    const comments  = db.collection("comments")
    return await comments.findOne({_id: new ObjectId(id)})
}