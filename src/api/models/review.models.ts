import { Review } from "../../types/api";
import db from "../../db/postgres/connection";

export const selectReviews = async (id: string): Promise<Review[]> => {
	const { rows } = await db.query(
		`SELECT * FROM reviews
        WHERE music_id = $1
        SORT BY created_at DESC
        ;`,
		[id]
	);

	return rows as Review[];
};
