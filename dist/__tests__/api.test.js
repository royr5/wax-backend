"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../app"));
const connection_1 = __importDefault(require(".././db/postgres/connection"));
const test_data_json_1 = require("../db/postgres/data/test-data.json");
const seed_1 = require("../db/postgres/seed/seed");
afterAll(() => {
    connection_1.default.end();
});
beforeEach(() => {
    return (0, seed_1.seed)(test_data_json_1.users, test_data_json_1.music, test_data_json_1.reviews);
});
describe('GET /api/music', () => {
    test('200: should return an array of object with all music', () => {
        return (0, supertest_1.default)(app_1.default)
            .get('/api/music')
            .expect(200)
            .then(({ body }) => {
            body.music.forEach((music) => {
                expect(music).toHaveProperty('music_id');
                expect(music).toHaveProperty('artist_ids');
                expect(music).toHaveProperty('artist_names');
                expect(music).toHaveProperty('name');
                expect(music).toHaveProperty('type');
                expect(music).toHaveProperty('tracks');
                expect(music).toHaveProperty('album_id');
                expect(music).toHaveProperty('genres');
                expect(music).toHaveProperty('preview');
                expect(music).toHaveProperty('album_img');
                expect(music).toHaveProperty('release_date');
                expect(typeof music.artist_names).toBe('object');
                expect(typeof music.tracks).toBe('object');
            });
        });
    });
    test('404: incorrect path', () => {
        return (0, supertest_1.default)(app_1.default)
            .get('/api/musicincorrect')
            .expect(404)
            .then((Response) => {
            expect(Response.body.msg).toBe('incorrect path - path not found');
        });
    });
});
describe('GET /api/music?music_id', () => {
    test('200: should return a single object of music by music_id', () => {
        return (0, supertest_1.default)(app_1.default)
            .get('/api/music?music_id=1MVqeIAwhD4T44AKVkIfic')
            .expect(200)
            .then(({ body }) => {
            expect(body.music.music_id).toBe('1MVqeIAwhD4T44AKVkIfic');
        });
    });
    test('404: not found', () => {
        return (0, supertest_1.default)(app_1.default)
            .get('/api/music?music_id=wrongthing')
            .expect(404)
            .then((Response) => {
            expect(Response.body.msg).toBe('not found');
        });
    });
});
describe('GET /api/music?artist_ids', () => {
    test('200: should return an array of music object by artist_ids for a particular artist', () => {
        return (0, supertest_1.default)(app_1.default)
            .get('/api/music?artist_ids=4oLeXFyACqeem2VImYeBFe')
            .expect(200)
            .then(({ body }) => {
            expect(body.music[0].artist_ids).toContain('4oLeXFyACqeem2VImYeBFe');
        });
    });
});
describe('GET /api/music?genres', () => {
    test('200: should return an array of music with the same genre', () => {
        return (0, supertest_1.default)(app_1.default)
            .get('/api/music?genres=country')
            .expect(200)
            .then(({ body }) => {
            expect(body.music[0].genres).toEqual(['Country']);
        });
    });
});
describe('GET /api/music?order', () => {
    test('200: should return an array of music ASC or DESC by release_date if no other query, DESC by default', () => {
        return (0, supertest_1.default)(app_1.default)
            .get('/api/music?order=ASC')
            .expect(200)
            .then(({ body }) => {
            expect(parseInt(body.music[0].release_date)).toBeLessThan(parseInt(body.music[1].release_date));
        });
    });
});
describe('GET /api/music?pagination', () => {
    test('200: should return an array of music paginated beyond the default limit of 40', () => {
        return (0, supertest_1.default)(app_1.default)
            .get('/api/music?p=2')
            .expect(200)
            .then(({ body }) => {
            expect(body.music.length).toBe(10);
        });
    });
});
describe('/api/reviews', () => {
    describe('GET /api/reviews', () => {
        it('200: should return an array of review objects', () => {
            return (0, supertest_1.default)(app_1.default)
                .get('/api/reviews')
                .expect(200)
                .then((response) => {
                const { body } = response;
                body.reviews.forEach((review) => {
                    expect(review).toMatchObject({
                        music_id: expect.any(Number),
                        user_id: expect.any(Number),
                        score: expect.any(Number),
                        title: expect.any(String || null),
                        body: expect.any(String || null),
                        created_at: expect.any(String),
                    });
                });
            });
        });
    });
    describe('/api/reviews/:music_id', () => {
        describe('GET /api/reviews/:music_id', () => {
            it('200: should return an array of review objects with passed music_id', () => {
                return (0, supertest_1.default)(app_1.default)
                    .get('/api/reviews/1')
                    .expect(200)
                    .then((response) => {
                    const { body } = response;
                    body.reviews.forEach((review) => {
                        expect(review).toMatchObject({
                            music_id: 1,
                            user_id: expect.any(Number),
                            score: expect.any(Number),
                            title: expect.any(String || null),
                            body: expect.any(String || null),
                            created_at: expect.any(String),
                        });
                    });
                });
            });
        });
    });
});
