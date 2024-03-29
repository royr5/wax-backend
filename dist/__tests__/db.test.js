"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = __importDefault(require("../db/postgres/connection"));
const seed_1 = require("../db/postgres/seed/seed");
const test_data_json_1 = require("../db/postgres/data/test-data.json");
beforeAll(async () => {
    await (0, seed_1.seed)(test_data_json_1.users, test_data_json_1.music, test_data_json_1.reviews);
});
afterAll(async () => {
    await connection_1.default.end();
});
describe("postgres", () => {
    it("should contain all users", async () => {
        const { rows } = await connection_1.default.query(`SELECT * FROM users;`);
        rows.forEach((row) => {
            expect(row).toMatchObject({
                username: expect.any(String),
                avatar_url: expect.any(String),
                bio: expect.any(String),
            });
        });
    });
    it("should contain all music", async () => {
        const { rows } = await connection_1.default.query(`SELECT * FROM music;`);
        rows.forEach((row) => {
            expect(row).toMatchObject({
                music_id: expect.any(String),
                artist_ids: expect.any(Array),
                artist_names: expect.any(Array),
                name: expect.any(String),
                type: expect.any(String),
                album_id: expect.any(String),
                release_date: expect.any(String),
            });
            row.genres !== null &&
                row.genres.forEach((genre) => {
                    expect(typeof genre).toBe("string");
                });
            row.tracks !== null &&
                row.tracks.forEach((track) => {
                    expect(typeof track).toBe("string");
                });
            row.album_img !== null && expect(typeof row.album_img).toBe("string");
            row.preview !== null && expect(typeof row.preview).toBe("string");
        });
    });
    it("should contain all reviews", async () => {
        const { rows } = await connection_1.default.query(`SELECT * FROM reviews;`);
        rows.forEach((row) => {
            expect(row).toMatchObject({
                review_id: expect.any(Number),
                username: expect.any(String),
                music_id: expect.any(String),
                rating: expect.any(Number),
                review_title: expect.any(String),
                review_body: expect.any(String),
            });
        });
    });
});
