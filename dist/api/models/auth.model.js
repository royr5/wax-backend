"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateUser = void 0;
const connection_1 = __importDefault(require("../../db/mongodb/connection"));
const authenticateUser = async (username, password) => {
    try {
        const mCl = await connection_1.default.connect();
        const mDb = mCl.db("gatefold_users");
        const mCol = mDb.collection("users");
        const areValidCredentials = (await mCol.countDocuments({
            username: username,
            password: password,
        })) === 1;
        connection_1.default.close();
        return areValidCredentials;
    }
    catch (err) {
        connection_1.default.close();
        return err;
    }
};
exports.authenticateUser = authenticateUser;
