import {MongoClient} from "mongodb";
import * as dotenv from 'dotenv'

dotenv.config()

class Server{
    constructor(host, port, morgan) {
        this.host = host
        this.port = port
        this.hosting = "http://" + this.host + ":" + this.port
        this.morgan = morgan
    }
}

class MongoDB{
    constructor (host, port, db_name) {
        this.host = host
        this.port = port
        this.name = db_name
        this.url = `mongodb://${this.host}:${this.port}/${this.name}`
    }

    async ConnDB(){
        try {
            const client = new MongoClient(this.url);
            await client.connect();
            console.log('Connected to MongoDB!');
            return client.db(this.name);
        } catch (error) {
            console.error('Error connecting to MongoDB:', error);
            process.exit(1);
        }
    }
}

export default class Config{
    #serverHost     = process.env.SERVER_HOST   || '127.0.0.1'
    #serverPort     = process.env.SERVER_PORT   || 8000
    #serverMorgan   = process.env.SERVER_MORGAN || 'dev'

    #mongoHost      = process.env.MONGODB_HOST  || '127.0.0.1'
    #mongoPort      = process.env.MONGODB_PORT  || 27017
    #mongoName      = process.env.MONGODB_NAME  || 'local'

    getServer(){
        return new Server(this.#serverHost, this.#serverPort, this.#serverMorgan)
    }
    getMongo(){
        return new MongoDB(this.#mongoHost, this.#mongoPort, this.#mongoName)
    }
}