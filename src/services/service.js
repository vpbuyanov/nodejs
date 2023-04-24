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
    await db.collection("comments").insertOne(data)
}

export async function GetAllComments(){
    return await db.collection("comments").find().toArray()
}

export async function FindComment(id){
    return await db.collection("comments").findOne({_id: new ObjectId(id)})
}

export async function UpdateComment(id, name, text){
    return await db.collection("comments").updateOne({_id: new ObjectId(id)}, {$set: {"name": name, "text": text}})
}

export async function DeleteComment(id){
    return await db.collection("comments").deleteOne({_id: new ObjectId(id)})
}

export async function AddUser(data) {
    return await db.collection("users").insertOne(data)
}

export async function DeleteUser(id) {
    return await db.collection("users").deleteOne({_id: new ObjectId(id)})
}

export async function GetModels() {
    return await db.collection("models").find().toArray()
}

export async function GetModel(id){
    return await db.collection("models").findOne({_id: new ObjectId(id)})
}

export async function DeleteMyModel(id) {
    return await db.collection("models").deleteOne({_id: new ObjectId(id)})
}

export async function UpdateModel(id, data) {
    data.last_update = new Date()
    return await db.collection("models").updateOne({_id: new ObjectId(id)}, {$set: data})
}

export async function CreateModel(data){
    data.last_update = new Date()
    return await db.collection("models").insertOne(data)
}
