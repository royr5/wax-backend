"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.selectAllMusic = void 0;
const connection_1 = __importDefault(require("../../db/postgres/connection"));
const pg_format_1 = __importDefault(require("pg-format"));
const selectAllMusic = (queries) => {
    const whereMusic_id = queries?.music_id ? `WHERE music_id = ${queries?.music_id}` : ``;
    const whereArtist_id = queries?.artist_id ? `WHERE artist_id = ${queries?.artist_id}` : ``;
    const whereGenre = queries?.genre ? `WHERE genre = ${queries?.genre}` : ``;
    const orderBy = queries?.order ? `${queries?.order}` : `release_date DESC`;
    const pagination = queries?.p ? `OFFSET ${queries?.p}` : ``;
    const formattedMusicQuery = (0, pg_format_1.default)(`SELECT * FROM music
    %s %s %s
    ORDER BY %s
    LIMIT 40
    %s
    ;`, whereMusic_id, whereArtist_id, whereGenre, orderBy, pagination);
    return connection_1.default.query(formattedMusicQuery).then(({ rows }) => {
        if (!rows.length) {
            return Promise.reject({ status: 404 });
        }
        return rows;
    });
};
exports.selectAllMusic = selectAllMusic;
