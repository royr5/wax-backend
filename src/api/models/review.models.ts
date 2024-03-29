import { Review } from "../../types/api";
import db from "../../db/postgres/connection";
import format from "pg-format";

export const selectReviews = async (id?: string): Promise<Review[]> => {
  const whereClause = id ? `WHERE music_id = '${id}'` : "";

  const formattedQuery = format(
    `SELECT * FROM reviews
    %s
    ORDER BY created_at DESC
    ;`,
    whereClause
  );

  const { rows } = await db.query(formattedQuery);
  return rows as Review[];
};

export const insertReview = async (
  music_id: string,
  username: string,
  rating: number,
  review_title?: string,
  review_body?: string
): Promise<Review[]> => {
  const {
    rows: [review],
  } = await db.query(
    `INSERT INTO reviews (
      music_id,
      username,
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
    RETURNING *;`,
    [music_id, username, rating, review_title, review_body]
  );
  return review;
};

export const deleteReview = async (id: string) => {
  const { rows } = await db.query(
    `DELETE FROM reviews
    WHERE review_id = $1
    RETURNING *
    ;`,
    [id]
  );

  if (!rows.length) return Promise.reject({ status: 404, msg: "not found" });
};
