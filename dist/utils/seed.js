"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs/promises"));
const test_data_json_1 = __importDefault(require("../db/postgres/data/test-data.json"));
const faker_1 = require("@faker-js/faker");
const formatMusicResponse = async () => {
    const unformatted = await fs.readFile(`${__dirname}/db/postgres/test-data/music.json`, "utf-8");
    const formatted = JSON.parse(unformatted);
    const output = formatted.tracks.items.map((song) => {
        return {
            preview: song.track.preview_url,
            type: song.track.album.album_type,
            name: song.track.name,
            music_id: song.track.id,
            artists: song.track.artists,
            album_id: song.track.album.id,
            album_images: song.track.album.images[0],
            album_name: song.track.album.name,
            release_date: song.track.album.release_date,
        };
    });
    await fs.writeFile(`${__dirname}/db/postgres/test-data/formatted-music.json`, JSON.stringify(output));
};
// formatMusicResponse();
const addGenres = async () => {
    const formatted = test_data_json_1.default.music.map((song) => {
        return {
            ...song,
            genres: [faker_1.faker.music.genre()],
        };
    });
    const output = {
        users: test_data_json_1.default.users,
        reviews: test_data_json_1.default.reviews,
        music: formatted,
    };
    await fs.writeFile(`${__dirname}/../db/postgres/data/test-data.json`, JSON.stringify(output));
};
// addGenres();
