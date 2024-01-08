"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const uri = "mongodb+srv://<credentials>@gatefold.mfug5v2.mongodb.net/?appName=mongosh+2.1.1";
const client = new mongodb_1.MongoClient(uri);
exports.default = client;
