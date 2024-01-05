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
