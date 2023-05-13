import Config from "../../config/config.js"

const config = new Config().getMongo()
let db = config.ConnDB()

export let session = await db;