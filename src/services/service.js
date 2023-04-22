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

export async function AddComments(data){
    const comments = db.collection("comments")
    await comments.insertOne(data)
}

export async function GetAllComments(){
    const comments  = db.collection("comments")
    return await comments.find().toArray()
}

export async function FindComment(id){
    const comments  = db.collection("comments")
    return await comments.findOne({_id: new ObjectId(id)})
}

export async function UpdateComment(id, name, text){
    return await db.collection("comments").updateOne({_id: new ObjectId(id)}, {$set: {"name": name, "text": text}})
}

export async function DeleteComment(id){
    return await db.collection("comments").deleteOne({_id: new ObjectId(id)})
}
