"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = __importDefault(require("../connection"));
const test_data_json_1 = require("../../postgres/data/test-data.json");
async function addUsers() {
    try {
        const database = await connection_1.default.db('gatefold_users');
        const drop = await database.collection('users').drop();
        console.log(`users collection dropped = ${drop}`);
        const usersCol = database.collection('users');
        const result = await usersCol.insertMany(test_data_json_1.users);
        console.log(`Inserted ids: ${result.insertedIds}`);
    }
    finally {
        await connection_1.default.close();
    }
}
addUsers().catch(console.dir);
