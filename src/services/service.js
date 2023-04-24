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

export async function Create(collections, data){
    try {
        return await db.collection(collections).insertOne(data)
    }catch (err) {
        return err
    }
}

export async function ReadAll(collections) {
    try {
        return await db.collection(collections).find()
    }catch (err) {
        return err
    }
}

export async function ReadOne(collections, id) {
    try {
        return await db.collection(collections).findOne({_id: new ObjectId(id)})
    }catch (err) {
        return err
    }
}

export async function Update(collections, id, data){
    try {
        return await db.collection(collections).updateOne({_id: new ObjectId(id)}, {$set: data})
    }catch (err){
        return err
    }
}

export async function Delete(collections, id) {
    try {
        return await db.collection(collections).deleteOne({_id: new ObjectId(id)})
    }catch (err) {
        return err
    }
}
