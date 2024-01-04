"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const test_data_json_1 = require("./../data/test-data.json");
const seed_1 = require("./seed");
const connection_1 = __importDefault(require("../connection"));
const runSeed = async () => {
    try {
        await (0, seed_1.seed)(test_data_json_1.users, test_data_json_1.music);
        connection_1.default.end;
    }
    catch (e) {
        throw new Error();
    }
};
runSeed();
exports.default = runSeed;
