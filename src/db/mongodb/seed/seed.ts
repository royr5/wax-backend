import client from "../connection"
import { Users } from "../../../types/api"
import {users} from "../../postgres/data/test-data.json"

async function addUsers() {
    try{

        const database = await client.db('gatefold_users')
        const usersCol = database.collection<Users>('users')
        const drop = await usersCol.deleteMany({})
        console.log(`Users removed- ${drop}`);
        
        

        const result = await usersCol.insertMany(users)
        
        console.log(`Inserted ids: ${result.insertedIds}`);
        
    } finally {
        await client.close()
    }
}
addUsers().catch(console.dir)