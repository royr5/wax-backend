"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../app"));
const connection_1 = __importDefault(require(".././db/postgres/connection"));
afterAll(() => {
    connection_1.default.end();
});
//import music data into seed function
// beforeEach(() => {
//   return seed()
// })
describe('GET /api/music', () => {
    test('200: should return an array of object with all music', () => {
        return (0, supertest_1.default)(app_1.default)
            .get('/api/music')
            .expect(200)
            .then(({ body }) => {
            body.forEach((music) => {
                expect(music).toHaveProperty('music_id');
                expect(music).toHaveProperty('artists');
                expect(music).toHaveProperty('artist_id');
                expect(music).toHaveProperty('name');
                expect(music).toHaveProperty('type');
                expect(music).toHaveProperty('tracks');
                expect(music).toHaveProperty('genre');
                expect(music).toHaveProperty('preview');
                expect(music).toHaveProperty('listen_link');
                expect(music).toHaveProperty('release_date');
                expect(music).toHaveProperty('artwork');
                expect(music.artists.length).toBe(true);
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
            .get('/api/music?music_id=1')
            .expect(200)
            .then(({ body }) => {
            expect(body.music_id).toBe(1);
        });
    });
    test('400: bad request on no number', () => {
        return (0, supertest_1.default)(app_1.default)
            .get('/api/music?music_id=wrongthing')
            .expect(400)
            .then((Response) => {
            expect(Response.body.msg).toBe('bad request');
        });
    });
});
describe('GET /api/music?artist_id', () => {
    test('200: should return an array of music object by artist_id for a particular artist', () => {
        return (0, supertest_1.default)(app_1.default)
            .get('/api/music?artist_id=2')
            .expect(200)
            .then(({ body }) => {
            body.forEach((music) => {
                expect(music.artist_ids[0]).toBe(2);
            });
        });
    });
});
describe('GET /api/music?genre', () => {
    test('200: should return an array of music with the same genre', () => {
        return (0, supertest_1.default)(app_1.default)
            .get('/api/music?genre=rock')
            .expect(200)
            .then(({ body }) => {
            body.forEach((music) => {
                expect(music.genre).toEqual(['rock']);
            });
        });
    });
    describe('GET /api/music?order', () => {
        test('200: should return an array of music ASC or DESC by release_date if no other query, DESC by default', () => {
            return (0, supertest_1.default)(app_1.default)
                .get('/api/music?order=ASC')
                .expect(200)
                .then(({ body }) => {
                expect(body[0].release_date).toBe('2024-01-01');
            });
        });
    });
    describe('GET /api/music?pagination', () => {
        test('200: should return an array of music paginated beyond the default limit of 40', () => {
            return (0, supertest_1.default)(app_1.default)
                .get('/api/music?p=2')
                .expect(200)
                .then(({ body }) => {
                expect(body[0].music_id).toBe(41);
            });
        });
    });
});
describe('', () => {
    test('should ', () => { });
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
