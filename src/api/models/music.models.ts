import db from '../../db/postgres/connection';
import format from 'pg-format';
import { Music, MusicQueries } from '../../types/api';

export const selectAllMusic = (queries?: MusicQueries) => {
  const whereMusic_id = queries?.music_id
    ? `WHERE music_id = '${queries?.music_id}'`
    : ``;

  const whereArtist_ids = queries?.artist_ids
    ? `WHERE '${queries?.artist_ids}' = ANY(artist_ids)`
    : ``;

  const whereGenres = queries?.genres ? `WHERE genres = ${queries?.genres}` : ``;

  const orderBy = queries?.order ? `release_date ${queries?.order}` : `release_date DESC`;

  const pagination = queries?.p ? `OFFSET ${(parseInt(queries?.p)*30)-30}` : ``;

  const formattedMusicQuery = format(
    `SELECT * FROM music
    %s %s %s
    ORDER BY %s
    LIMIT 30
    %s
    ;`,

    whereMusic_id,
    whereArtist_ids,
    whereGenres,
    orderBy,
    pagination
  );

  return db.query(formattedMusicQuery).then(({ rows }: { rows: Music[] }) => {
    if (!rows.length) {
      return Promise.reject({ status: 404 });
    } else if (rows.length === 1) {
      return rows[0];
    }
    return rows;
  });
};
