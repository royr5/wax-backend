import { MongoClient } from "mongodb";
import * as dotenv from 'dotenv'

dotenv.config({path: `${__dirname}/../../../.env`})

const uri = `mongodb+srv://${process.env.MONGO_CREDENTIALS!}@gatefold.mfug5v2.mongodb.net/?appName=mongosh+2.1.1`


const client = new MongoClient(uri)

export default client
