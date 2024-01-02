"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.selectReviews = void 0;
const connection_1 = __importDefault(require("../../db/postgres/connection"));
const selectReviews = async (id) => {
    const { rows } = await connection_1.default.query(`SELECT * FROM reviews
        WHERE music_id = $1
        SORT BY created_at DESC
        ;`, [id]);
    return rows;
};
exports.selectReviews = selectReviews;
