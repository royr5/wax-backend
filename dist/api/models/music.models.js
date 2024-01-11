"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertMusic = exports.selectAllMusic = void 0;
const connection_1 = __importDefault(require("../../db/postgres/connection"));
const pg_format_1 = __importDefault(require("pg-format"));
const selectAllMusic = (queries, all) => {
    const whereMusic_id = queries?.music_id
        ? `WHERE music.music_id = '${queries?.music_id}'`
        : ``;
    const whereArtist_ids = queries?.artist_ids
        ? `WHERE '${queries?.artist_ids}' = ANY(artist_ids)`
        : ``;
    const whereGenres = queries?.genres
        ? `WHERE '${queries?.genres.charAt(0).toUpperCase() + queries?.genres.slice(1)}' = ANY(genres)`
        : ``;
    const orderBy = queries?.order
        ? `release_date ${queries?.order}`
        : `release_date DESC`;
    const pagination = queries?.p && !all
        ? `OFFSET ${parseInt(queries?.p) * 30 - 30}`
        : ``;
    const limit = !all
        ? `LIMIT  30`
        : ``;
    const aggAvgRating = queries?.avg_rating === "true"
        ? `,  ROUND(AVG(reviews.rating),1) AS avg_rating `
        : ``;
    const groupAvgRating = queries?.avg_rating === "true" ? `GROUP BY music.music_id` : ``;
    const joinAvgRating = queries?.avg_rating === "true"
        ? `FULL JOIN reviews ON music.music_id = reviews.music_id`
        : ``;
    const formattedMusicQuery = (0, pg_format_1.default)(`SELECT music.music_id, artist_ids, artist_names, name, type, tracks, album_id, genres, preview, album_img, release_date %s FROM music
    %s
    %s
    %s
    %s
    %s
    ORDER BY %s
    %s
    %s
    ;`, aggAvgRating, joinAvgRating, whereMusic_id, whereArtist_ids, whereGenres, groupAvgRating, orderBy, limit, pagination);
    return connection_1.default.query(formattedMusicQuery).then(({ rows }) => {
        if (!rows.length) {
            return Promise.reject({ status: 404, msg: "not found" });
        }
        else if (rows.length === 1) {
            return rows[0];
        }
        return rows;
    });
};
exports.selectAllMusic = selectAllMusic;
const handleDate = (date) => {
    if (date.length > 4)
        return date;
    if (date.length === 4)
        return `${date}-01-01`;
};
const insertMusic = async (music) => {
    const formattedMusic = Array.isArray(music)
        ? music.map((item) => [
            item.music_id,
            `{${item.artist_ids.map((artist_id) => `'${artist_id}'`)}}`,
            `{${item.artist_names.map((artist_name) => `${artist_name}`)}}`,
            item.name,
            item.type,
            item.tracks && `{${item.tracks.map((track) => `${track}`)}}`,
            item.album_id,
            item.preview,
            item.album_img,
            handleDate(item.release_date),
        ])
        : [
            [
                music.music_id,
                `{${music.artist_ids.map((artist_id) => `'${artist_id}'`)}}`,
                `{${music.artist_names.map((artist_name) => `${artist_name}`)}}`,
                music.name,
                music.type,
                music.tracks && `{${music.tracks.map((track) => `${track}`)}}`,
                music.album_id,
                music.preview,
                music.album_img,
                handleDate(music.release_date),
            ],
        ];
    const formattedMusicQuery = (0, pg_format_1.default)(`INSERT INTO music
    (music_id, artist_ids, artist_names, name, type, tracks, album_id, preview, album_img, release_date)
    VALUES
    %L
    RETURNING *
    ;`, formattedMusic);
    const { rows } = await connection_1.default.query(formattedMusicQuery);
    return rows;
};
exports.insertMusic = insertMusic;
