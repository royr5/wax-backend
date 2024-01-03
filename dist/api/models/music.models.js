"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.selectAllMusic = void 0;
const connection_1 = __importDefault(require("../../db/postgres/connection"));
const selectAllMusic = (queries) => {
    return connection_1.default
        .query(`SELECT * FROM music;`)
        .then(({ rows }) => {
        return rows;
    });
};
exports.selectAllMusic = selectAllMusic;
