import { MongoClient } from "mongodb";

const uri = "mongodb+srv://<credentials>@gatefold.mfug5v2.mongodb.net/?appName=mongosh+2.1.1"

const client = new MongoClient(uri)

export default client
