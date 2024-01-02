

export const selectAllMusic = () => {
    return db
    .query(
        `SELECT * FROM music;`
    )
    .then(({rows: music}) => {
        return music
    })
}