"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = __importDefault(require("../db/postgres/connection"));
const seed_1 = require("../db/postgres/seed/seed");
const test_data_json_1 = require("../db/postgres/data/test-data.json");
beforeAll(async () => {
    await (0, seed_1.seed)(test_data_json_1.users, test_data_json_1.music);
});
afterAll(async () => {
    await connection_1.default.end();
});
describe('postgres', () => {
    it('should contain all users', async () => {
        const { rows } = await connection_1.default.query(`SELECT * FROM users;`);
        expect(rows).toMatchObject(test_data_json_1.users);
    });
    it('should contain all music', async () => {
        const { rows } = await connection_1.default.query(`SELECT * FROM music;`);
        rows.forEach((row) => {
            expect(row).toMatchObject({
                music_id: expect.any(String),
                artist_ids: expect.any(Array),
                artist_names: expect.any(Array),
                name: expect.any(String),
                type: expect.any(String),
                album_id: expect.any(String),
                release_date: expect.any(Date),
            });
            expect(String(row.genres)).toMatch(/\[.*\]|null/i);
            expect(String(row.tracks)).toMatch(/\[.*\]|null/i);
            expect(String(row.album_img)).toMatch(/\w|null/i);
            expect(String(row.preview)).toMatch(/\w|null/i);
        });
    });
});
