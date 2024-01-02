import db from '../../db/postgres/connection'
import { Music } from '../../types/api'

export const selectAllMusic = () => {
    return db
    .query(
        `SELECT * FROM music;`
    )
    .then(({rows}: {rows: Music[]}) => {
        return rows 
    })
}