import db from "../../db/postgres/connection";
import format from "pg-format";
import { Music, MusicQueries } from "../../types/api";

export const selectAllMusic = (
  queries?: MusicQueries
): Promise<Music | Music[]> => {
  const whereMusic_id = queries?.music_id
    ? `WHERE music_id = '${queries?.music_id}'`
    : ``;

  const whereArtist_ids = queries?.artist_ids
    ? `WHERE '${queries?.artist_ids}' = ANY(artist_ids)`
    : ``;

  const whereGenres = queries?.genres
    ? `WHERE '${
        queries?.genres.charAt(0).toUpperCase() + queries?.genres.slice(1)
      }' = ANY(genres)`
    : ``;

  const orderBy = queries?.order
    ? `release_date ${queries?.order}`
    : `release_date DESC`;

  const pagination = queries?.p
    ? `OFFSET ${parseInt(queries?.p) * 30 - 30}`
    : ``;

  const aggAvgRating =
    queries?.avg_rating === "true"
      ? `,  AVG(reviews.rating) AS avg_rating `
      : ``;

  const groupAvgRating =
    queries?.avg_rating === "true" ? `GROUP BY music.music_id` : ``;

  const joinAvgRating =
    queries?.avg_rating === "true"
      ? `LEFT JOIN reviews ON music.music_id = reviews.music_id`
      : ``;

  const formattedMusicQuery = format(
    `SELECT music.music_id, artist_ids, artist_names, name, type, tracks, album_id, genres, preview, album_img, release_date %s FROM music
    %s %s %s %s %s
    ORDER BY %s
    LIMIT 30
    %s
    ;`,
    aggAvgRating,
    joinAvgRating,
    whereMusic_id,
    whereArtist_ids,
    whereGenres,
    groupAvgRating,
    orderBy,
    pagination
  );
  return db.query(formattedMusicQuery).then(({ rows }: { rows: Music[] }) => {
    if (!rows.length) {
      return Promise.reject({ status: 404, msg: "not found" });
    } else if (rows.length === 1) {
      return rows[0];
    }
    return rows;
  });
};
