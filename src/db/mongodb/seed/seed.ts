import client from "../connection";
import { MongoUsers } from "../../../types/api";
import { users } from "../../postgres/data/test-data.json";
const bcrypt = require("bcryptjs");


async function addUsers() {
  try {
    const database = await client.db("gatefold_users");
    const usersCol = database.collection<MongoUsers>("users");
    const drop = await usersCol.deleteMany({});
    console.log(`Users removed- ${drop}`);

    const testMongoUsers = users.map((user) => {
      const salt = bcrypt.genSaltSync(10);
      const password = bcrypt.hashSync(user.password, salt)
      return { username: user.username, password, salt };
    });

    const result = await usersCol.insertMany(testMongoUsers);

    console.log(`Inserted ids: ${result.insertedIds}`);
  } finally {
    await client.close();
  }
}
addUsers().catch(console.dir);
