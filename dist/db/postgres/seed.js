"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seed = void 0;
const connection_1 = __importDefault(require("./connection"));
const pg_format_1 = __importDefault(require("pg-format"));
const seed = async (users, music) => {
    //? Drop tables if they exist
    await connection_1.default.query(`DROP TABLE IF EXISTS users;`);
    await connection_1.default.query(`DROP TABLE IF EXISTS music;`);
    //? Create tables
    await connection_1.default.query(`CREATE TABLE users (
        user_id SERIAL PRIMARY KEY,
        screen_name VARCHAR NOT NULL,
        avatar_url VARCHAR DEFAULT NULL,
        bio VARCHAR DEFAULT NULL
        );`);
    await connection_1.default.query(`CREATE TABLE music (
        music_id VARCHAR PRIMARY KEY,
        artist_ids text ARRAY NOT NULL,
        artist_names text ARRAY NOT NULL,
        name VARCHAR NOT NULL,
        type VARCHAR NOT NULL,
        tracks text ARRAY DEFAULT NULL,
        album_id VARCHAR DEFAULT NULL,
        genres text ARRAY DEFAULT NULL,
        preview VARCHAR DEFAULT NULL,
        album_img VARCHAR DEFAULT NULL,
        release_date DATE NOT NULL
        )`);
    //? Insert data
    const formattedUsers = (0, pg_format_1.default)(`
        INSERT INTO users (screen_name, avatar_url, bio)
        VALUES
        %L;`, users.map((user) => [user.screen_name, user.avatar_url, user.bio]));
    await connection_1.default.query(formattedUsers);
    const formattedMusic = (0, pg_format_1.default)(`
        INSERT INTO music (music_id, artist_ids, artist_names, name, type, tracks, album_id, genres, preview, album_img, release_date)
        VALUES
        %L;`, music.map((item) => [
        item.music_id,
        `{${item.artists.map((artist) => `${artist.id}`)}}`,
        `{${item.artists.map((artist) => `${artist.name}`)}}`,
        item.name,
        item.type,
        item.tracks,
        item.album_id,
        item.genres,
        item.preview,
        item.album_images.url,
        item.release_date,
    ]));
    await connection_1.default.query(formattedMusic);
};
exports.seed = seed;
