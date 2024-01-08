import client from "../connection"
import { Users } from "../../../types/api"
import {users} from "../../postgres/data/test-data.json"

async function addUsers() {
    try{

        const database = await client.db('gatefold_users')
        const drop = await database.collection('users').drop()
        console.log(`users collection dropped = ${drop}`);
        const usersCol = database.collection<Users>('users')
        
        

        const result = await usersCol.insertMany(users)
        
        console.log(`Inserted ids: ${result.insertedIds}`);
        
    } finally {
        await client.close()
    }
}
addUsers().catch(console.dir)