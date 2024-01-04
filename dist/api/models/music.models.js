"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.selectAllMusic = void 0;
const connection_1 = __importDefault(require("../../db/postgres/connection"));
const pg_format_1 = __importDefault(require("pg-format"));
const selectAllMusic = (queries) => {
    const whereMusic_id = queries?.music_id
        ? `WHERE music_id = '${queries?.music_id}'`
        : ``;
    const whereArtist_ids = queries?.artist_ids
        ? `WHERE '${queries?.artist_ids}' = ANY(artist_ids)`
        : ``;
    const whereGenres = queries?.genres ? `WHERE genres = ${queries?.genres}` : ``;
    const orderBy = queries?.order ? `release_date ${queries?.order}` : `release_date DESC`;
    const pagination = queries?.p ? `OFFSET ${(parseInt(queries?.p) * 30) - 30}` : ``;
    const formattedMusicQuery = (0, pg_format_1.default)(`SELECT * FROM music
    %s %s %s
    ORDER BY %s
    LIMIT 30
    %s
    ;`, whereMusic_id, whereArtist_ids, whereGenres, orderBy, pagination);
    return connection_1.default.query(formattedMusicQuery).then(({ rows }) => {
        if (!rows.length) {
            return Promise.reject({ status: 404 });
        }
        else if (rows.length === 1) {
            return rows[0];
        }
        return rows;
    });
};
exports.selectAllMusic = selectAllMusic;
