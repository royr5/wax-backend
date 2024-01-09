"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = __importDefault(require("../connection"));
const test_data_json_1 = require("../../postgres/data/test-data.json");
async function addUsers() {
    try {
        const database = await connection_1.default.db("gatefold_users");
        const usersCol = database.collection("users");
        const drop = await usersCol.deleteMany({});
        console.log(`Users removed- ${drop}`);
        const testMongoUsers = test_data_json_1.users.map((user) => {
            return { username: user.username, password: "test" };
        });
        const result = await usersCol.insertMany(testMongoUsers);
        console.log(`Inserted ids: ${result.insertedIds}`);
    }
    finally {
        await connection_1.default.close();
    }
}
addUsers().catch(console.dir);
