import db from '../../db/postgres/connection'
import format from 'pg-format'
import { Music, MusicQueries } from '../../types/api'

export const selectAllMusic = (queries?: MusicQueries) => {


  const whereMusic_id = queries?.music_id ? `WHERE music_id = ${queries?.music_id}` : ``;

  const whereArtist_id = queries?.artist_id ? `WHERE artist_id = ${queries?.artist_id}` : ``;

  const whereGenre = queries?.genre ? `WHERE genre = ${queries?.genre}` : ``;

  const orderBy = queries?.order ? `${queries?.order}` : `release_date DESC`;
  
  const pagination = queries?.p ? `OFFSET ${queries?.p}`: ``
  
  const formattedMusicQuery = format(
    `SELECT * FROM music
    %s %s %s
    ORDER BY %s
    LIMIT 40
    %s
    ;`,

    whereMusic_id,
    whereArtist_id,
    whereGenre,
    orderBy,
    pagination
    
  )

  return db.query(formattedMusicQuery).then(({ rows }: { rows: Music[] }) => {
    if(!rows.length){return Promise.reject({status: 404})}
    return rows
  })
}
