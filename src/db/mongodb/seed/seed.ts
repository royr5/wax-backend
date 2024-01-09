import client from "../connection"
import { MongoUsers } from "../../../types/api"
import {users} from "../../postgres/data/test-data.json"

async function addUsers() {
    try{

        const database = await client.db('gatefold_users')
        const usersCol = database.collection<MongoUsers>('users')
        const drop = await usersCol.deleteMany({})
        console.log(`Users removed- ${drop}`);

        const testMongoUsers = users.map(user => {
            return {username: user.username , password: 'test'}
        })
        
        console.log(testMongoUsers)
        

        const result = await usersCol.insertMany(testMongoUsers)
        
        console.log(`Inserted ids: ${result.insertedIds}`);
        
    } finally {
        await client.close()
    }
}
addUsers().catch(console.dir)