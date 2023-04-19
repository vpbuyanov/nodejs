import config from "config"
import { MongoClient } from "mongodb"


const mongo_host = config.get("mongodb.host")
const mongo_port = config.get("mongodb.port")
const mongo_name = config.get("mongodb.name")

const URL = `mongodb://${mongo_host}:${mongo_port}/${mongo_name}`;

let dbConnection;

export function connDB(cb){
    MongoClient
        .connect(URL)
        .then((client) => {
            console.log('Connected to MongoDB');
            dbConnection = client.db();
            return cb();
        })
        .catch((err) => {
            return cb(err);
        });
}

export const getDb = () => dbConnection

