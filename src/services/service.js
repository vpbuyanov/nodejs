import {ObjectId} from "mongodb"
import Config from "../../config/config.js"

let db

const config = new Config().getMongo()
config.ConnDB().then(
    result => { db = result }
).catch(err => console.log(err))

export async function Create(collections, data)  {
    try {
        if (collections === "models"){
            data.time_create = new Date()
            data.last_update = new Date()
        }
        return await db.collection(collections).insertOne(data)
    }catch (err) {
        return err
    }
}

export async function ReadAll(collections) {
    try {
        return await db.collection(collections).find().toArray()
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

export async function Update(collections, id, data) {
    try {
        if (collections === "models"){
            data.last_update = new Date()
        }
        return await db.collection(collections).updateOne({_id: new ObjectId(id)}, {$set: data})
    }catch (err){
        return err
    }
}

export async function Delete(collections, id) {
    try {
        const model = await db.collection(collections).findOne({_id: new ObjectId(id)})
        if (model){
            return await model.deleteOne({_id: new ObjectId(id)})
        }else{
            return null
        }
    }catch (err) {
        return err
    }
}

export async function getApiKeys() {
    const keys = []
    const objectKeys = await ReadAll('users')

    objectKeys.forEach(element => keys.push(element.api_key))
    return keys
}
