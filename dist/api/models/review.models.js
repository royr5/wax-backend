"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertReview = exports.selectReviews = void 0;
const connection_1 = __importDefault(require("../../db/postgres/connection"));
const pg_format_1 = __importDefault(require("pg-format"));
const selectReviews = async (id) => {
    const whereClause = id ? `WHERE music_id = '${id}'` : "";
    const formattedQuery = (0, pg_format_1.default)(`SELECT * FROM reviews
    %s
    ORDER BY created_at DESC
    ;`, whereClause);
    const { rows } = await connection_1.default.query(formattedQuery);
    return rows;
};
exports.selectReviews = selectReviews;
const insertReview = async (music_id, screen_name, rating, review_title, review_body) => {
    const { rows: [review] } = await connection_1.default.query(`INSERT INTO reviews (
      music_id,
      screen_name,
      rating,
      review_title,
      review_body,
      created_at
      )
    VALUES (
      $1,
      $2,
      $3,
      $4,
      $5,
      NOW()
    )
    RETURNING *;`, [music_id, screen_name, rating, review_title, review_body]);
    return review;
};
exports.insertReview = insertReview;
