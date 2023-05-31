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
    constructor (url) {
        this.url = "mongodb://" + url
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
    #serverHost     = '127.0.0.1'
    #serverPort     = process.env.SERVER_PORT   || 8000
    #serverMorgan   = process.env.SERVER_MORGAN || 'dev'

    #mongoUrl       = "mongo:27017/aga"
    #imgBBApiKey    = "ee61ab75f41533f7a6ea1392973f7bd1"

    getServer(){
        return new Server(this.#serverHost, this.#serverPort, this.#serverMorgan)
    }
    getMongo(){
        return new MongoDB(this.#mongoUrl)
    }
    getImgBBApiKey() {
        return this.#imgBBApiKey;
    }
}