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
const connection_2 = __importDefault(require("../db/mongodb/connection"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
afterAll(async () => {
    connection_1.default.end();
    await connection_2.default.connect();
    await connection_2.default
        .db("gatefold_users")
        .collection("users")
        .deleteMany({
        username: { $in: ["ari", "franc", "roshan", "daif", "karo", "jordan"] },
    });
    connection_2.default.close();
});
beforeAll(async () => {
    await connection_2.default.connect();
    await connection_2.default
        .db("gatefold_users")
        .collection("users")
        .insertMany([
        {
            username: "ari",
            password: await bcryptjs_1.default.hash("iSecretlyLoveCheese", 10),
        },
        { username: "franc", password: "pizza" },
        { username: "roshan", password: "redlight" },
        { username: "daif", password: "nchelp" },
        { username: "karo", password: "shawarma" },
        { username: "jordan", password: "radiusedEdge" },
    ]);
    connection_2.default.close();
});
beforeEach(() => {
    return (0, seed_1.seed)(test_data_json_1.users, test_data_json_1.music, test_data_json_1.reviews);
});
describe("/api/music", () => {
    describe("GET /api/music", () => {
        test("200: should return an array of object with all music", () => {
            return (0, supertest_1.default)(app_1.default)
                .get("/api/music")
                .expect(200)
                .then(({ body }) => {
                body.music.forEach((music) => {
                    expect(music).toHaveProperty("music_id");
                    expect(music).toHaveProperty("artist_ids");
                    expect(music).toHaveProperty("artist_names");
                    expect(music).toHaveProperty("name");
                    expect(music).toHaveProperty("type");
                    expect(music).toHaveProperty("tracks");
                    expect(music).toHaveProperty("album_id");
                    expect(music).toHaveProperty("genres");
                    expect(music).toHaveProperty("preview");
                    expect(music).toHaveProperty("album_img");
                    expect(music).toHaveProperty("release_date");
                    expect(typeof music.artist_names).toBe("object");
                    expect(typeof music.tracks).toBe("object");
                });
            });
        });
        test("404: incorrect path", () => {
            return (0, supertest_1.default)(app_1.default)
                .get("/api/musicincorrect")
                .expect(404)
                .then((Response) => {
                expect(Response.body.msg).toBe("incorrect path - path not found");
            });
        });
    });
    describe("GET /api/music?music_id", () => {
        test("200: should return a single object of music by music_id", () => {
            return (0, supertest_1.default)(app_1.default)
                .get("/api/music?music_id=1MVqeIAwhD4T44AKVkIfic")
                .expect(200)
                .then(({ body }) => {
                expect(body.music.music_id).toBe("1MVqeIAwhD4T44AKVkIfic");
            });
        });
        test("404: not found", () => {
            return (0, supertest_1.default)(app_1.default)
                .get("/api/music?music_id=wrongthing")
                .expect(404)
                .then((Response) => {
                expect(Response.body.msg).toBe("not found");
            });
        });
    });
    describe("GET /api/music?artist_ids", () => {
        test("200: should return an array of music object by artist_ids for a particular artist", () => {
            return (0, supertest_1.default)(app_1.default)
                .get("/api/music?artist_ids=4oLeXFyACqeem2VImYeBFe")
                .expect(200)
                .then(({ body }) => {
                expect(body.music[0].artist_ids).toContain("4oLeXFyACqeem2VImYeBFe");
            });
        });
    });
    describe("GET /api/music?genres", () => {
        test("200: should return an array of music with the same genre", () => {
            return (0, supertest_1.default)(app_1.default)
                .get("/api/music?genres=country")
                .expect(200)
                .then(({ body }) => {
                expect(body.music[0].genres).toEqual(["Country"]);
            });
        });
    });
    describe("GET /api/music?order", () => {
        test("200: should return an array of music ASC or DESC by release_date if no other query, DESC by default", () => {
            return (0, supertest_1.default)(app_1.default)
                .get("/api/music?order=ASC")
                .expect(200)
                .then(({ body }) => {
                expect(parseInt(body.music[0].release_date)).toBeLessThan(parseInt(body.music[1].release_date));
            });
        });
    });
    describe("GET /api/music?pagination", () => {
        test("200: should return an array of music paginated beyond the default limit of 40", () => {
            return (0, supertest_1.default)(app_1.default)
                .get("/api/music?p=2")
                .expect(200)
                .then(({ body }) => {
                expect(body.music.length).toBe(10);
            });
        });
    });
    describe("GET /api/music?avg_rating", () => {
        it("200: should return an array of music with avg_rating property when passed true", () => {
            return (0, supertest_1.default)(app_1.default)
                .get("/api/music?avg_rating=true")
                .expect(200)
                .then(({ body }) => {
                body.music.forEach((song) => {
                    expect(song).toHaveProperty("avg_rating");
                });
            });
        });
        it("200: should default to false", () => {
            return (0, supertest_1.default)(app_1.default)
                .get("/api/music")
                .expect(200)
                .then(({ body }) => {
                body.music.forEach((song) => {
                    expect(song).not.toHaveProperty("avg_rating");
                });
            });
        });
        it("200: should chain with other queries", () => {
            return (0, supertest_1.default)(app_1.default)
                .get("/api/music?music_id=1MVqeIAwhD4T44AKVkIfic&avg_rating=true")
                .expect(200)
                .then(({ body }) => {
                expect(body.music).toHaveProperty("avg_rating");
            });
        });
    });
    describe("POST /api/music", () => {
        it("201: should create a new music item in the database", async () => {
            const { body } = await (0, supertest_1.default)(app_1.default)
                .post("/api/music")
                .send({
                music_id: "test-music-id",
                artist_ids: ["test-artist-id"],
                artist_names: ["test-artist-names"],
                name: "test-name",
                type: "song",
                tracks: ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"],
                release_date: "2023-08-05",
            })
                .expect(201);
            const newMusic = await (0, supertest_1.default)(app_1.default)
                .get(`/api/music?music_id=test-music-id`)
                .expect(200);
            expect(newMusic.body.music.music_id).toBe("test-music-id");
        });
    });
});
describe("/api/reviews", () => {
    describe("GET /api/reviews", () => {
        it("200: should return an array of review objects", () => {
            return (0, supertest_1.default)(app_1.default)
                .get("/api/reviews")
                .expect(200)
                .then((response) => {
                const { body } = response;
                body.reviews.forEach((review) => {
                    expect(review).toMatchObject({
                        music_id: expect.any(String),
                        username: expect.any(String),
                        rating: expect.any(Number),
                        review_id: expect.any(Number),
                        review_title: expect.any(String || null),
                        review_body: expect.any(String || null),
                        created_at: expect.any(String),
                    });
                });
            });
        });
    });
    describe("/api/reviews/:music_id", () => {
        describe("GET /api/reviews/:music_id", () => {
            it("200: should return an array of review objects with passed music_id", () => {
                return (0, supertest_1.default)(app_1.default)
                    .get("/api/reviews/2IGMVunIBsBLtEQyoI1Mu7")
                    .expect(200)
                    .then((response) => {
                    const { body } = response;
                    body.reviews.forEach((review) => {
                        expect(review).toMatchObject({
                            review_id: expect.any(Number),
                            music_id: "2IGMVunIBsBLtEQyoI1Mu7",
                            username: expect.any(String),
                            rating: expect.any(Number),
                            review_title: expect.any(String || null),
                            review_body: expect.any(String || null),
                            created_at: expect.any(String),
                        });
                    });
                });
            });
        });
        describe("POST /api/reviews/:music_id", () => {
            test("201: inserts a new review to the db and returns the new review back to the client", () => {
                const newReview = {
                    username: "night_owl_philosopher",
                    rating: 1,
                    review_title: "Not what I was expecting",
                    review_body: "I was expecting the song to be all about escaping being tied up underwater, what a disappointment!",
                };
                return (0, supertest_1.default)(app_1.default)
                    .post("/api/reviews/4OMJGnvZfDvsePyCwRGO7X")
                    .send(newReview)
                    .expect(201)
                    .then(({ body: { review } }) => {
                    expect(review.review_id).toEqual(expect.any(Number));
                    expect(review.review_title).toBe("Not what I was expecting");
                    expect(review.review_body).toBe("I was expecting the song to be all about escaping being tied up underwater, what a disappointment!");
                    expect(review.music_id).toBe("4OMJGnvZfDvsePyCwRGO7X");
                    expect(review.username).toBe("night_owl_philosopher");
                    expect(review.rating).toBe(1);
                    expect(review.created_at).toEqual(expect.any(String));
                })
                    .then(() => {
                    return (0, supertest_1.default)(app_1.default)
                        .get("/api/reviews/4OMJGnvZfDvsePyCwRGO7X")
                        .expect(200);
                })
                    .then(({ body: { reviews } }) => {
                    expect(reviews.some((review) => review.review_body ===
                        "I was expecting the song to be all about escaping being tied up underwater, what a disappointment!")).toBe(true);
                });
            });
            test("201: inserts a new review to the db and returns the new review back to the client, with optional fields omitted", () => {
                const ratingOnlyReview = {
                    username: "night_owl_philosopher",
                    rating: 3,
                };
                return (0, supertest_1.default)(app_1.default)
                    .post("/api/reviews/2IGMVunIBsBLtEQyoI1Mu7")
                    .send(ratingOnlyReview)
                    .expect(201)
                    .then(({ body: { review } }) => {
                    expect(review.review_id).toEqual(expect.any(Number));
                    expect(review.review_title).toBe(null);
                    expect(review.review_body).toBe(null);
                    expect(review.music_id).toBe("2IGMVunIBsBLtEQyoI1Mu7");
                    expect(review.username).toBe("night_owl_philosopher");
                    expect(review.rating).toBe(3);
                    expect(review.created_at).toEqual(expect.any(String));
                });
            });
            test("POST:400 responds with an appropriate status and error message when provided with a bad review (missing required keys)", () => {
                const badReview = {
                    username: "night_owl_philosopher",
                    review_title: "I hate rating things, it seems petty",
                };
                return (0, supertest_1.default)(app_1.default)
                    .post("/api/reviews/4OMJGnvZfDvsePyCwRGO7X")
                    .send(badReview)
                    .expect(400)
                    .then(({ body: { msg } }) => {
                    expect(msg).toBe("bad request");
                });
            });
            test("POST:404 responds with an appropriate status and error message when provided with an incorrect screen name)", () => {
                const incorrectScreenNameReview = {
                    username: "rumpelstiltskin",
                    rating: 1,
                    review_body: "I bet my name wasn't in your database",
                };
                return (0, supertest_1.default)(app_1.default)
                    .post("/api/reviews/4OMJGnvZfDvsePyCwRGO7X")
                    .send(incorrectScreenNameReview)
                    .expect(404)
                    .then(({ body: { msg } }) => {
                    expect(msg).toBe("not found");
                });
            });
            test("POST:404 sends an appropriate status and error message when given a valid but non-existent music id", () => {
                const reviewOfNonExistentSong = {
                    username: "night_owl_philosopher",
                    rating: 10,
                    review_title: "Truly Wonderful",
                    review_body: "I love to discuss the non-existent - the impossible! I'm the existentialism equivalent of Groucho Marx...",
                };
                return (0, supertest_1.default)(app_1.default)
                    .post("/api/reviews/4OMJGnvPxDvsePyCwRGO0X")
                    .send(reviewOfNonExistentSong)
                    .expect(404)
                    .then(({ body: { msg } }) => {
                    expect(msg).toBe("not found");
                });
            });
        });
    });
    describe("/api/reviews/:review_id", () => {
        it("204: should delete review from database", async () => {
            await (0, supertest_1.default)(app_1.default).delete("/api/reviews/1").expect(204);
            return (0, supertest_1.default)(app_1.default)
                .get("/api/reviews")
                .expect(200)
                .then((response) => {
                const { body } = response;
                body.reviews.every((review) => {
                    review.review_id !== 1;
                });
            });
        });
    });
    test("404 responds with an appropriate status and error message when given a non-existent id", () => {
        return (0, supertest_1.default)(app_1.default)
            .delete("/api/reviews/999")
            .expect(404)
            .then(({ body: { msg } }) => {
            expect(msg).toBe("not found");
        });
    });
    test("400 responds with an appropriate status and error message when given an invalid id", () => {
        return (0, supertest_1.default)(app_1.default)
            .delete("/api/reviews/no-review")
            .expect(400)
            .then(({ body: { msg } }) => {
            expect(msg).toBe("bad request");
        });
    });
});
describe("/api/search", () => {
    describe("track", () => {
        it("200: should be able to return a track from spotify, that doesn`t exist in database", () => {
            return (0, supertest_1.default)(app_1.default)
                .get("/api/search?q=take+care&type=track")
                .expect(200)
                .then(({ body }) => {
                expect(body.music.some((music) => /((take).*(care))|((care).*(take))/gi.test(music.name))).toBe(true);
            });
        });
    });
    describe("album", () => {
        it("200: should be able to return a album from spotify, that doesn`t exist in database", () => {
            return (0, supertest_1.default)(app_1.default)
                .get("/api/search?q=take+care&type=album")
                .expect(200)
                .then(({ body }) => {
                expect(body.music.some((music) => /((take).*(care))|((care).*(take))/gi.test(music.name))).toBe(true);
            });
        });
    });
    describe("update database", () => {
        it("200: should update the database to include results from spotify", async () => {
            const spotifyResponse = await (0, supertest_1.default)(app_1.default)
                .get("/api/search?q=bohemian+rhapsody&type=track")
                .expect(200);
            const firstHit = spotifyResponse.body.music[0].music_id;
            const databaseResponse = await (0, supertest_1.default)(app_1.default)
                .get(`/api/music?music_id=${firstHit}`)
                .expect(200);
            const databaseTrack = databaseResponse.body.music;
            expect(databaseTrack.music_id).toBe(firstHit);
        });
    });
    describe("/api/auth", () => {
        describe("POST /api/auth", () => {
            test("200: when sent a request with a valid username and password, returns the correct object", () => {
                return (0, supertest_1.default)(app_1.default)
                    .post("/api/auth")
                    .send({ username: "ari", password: "iSecretlyLoveCheese" })
                    .expect(200)
                    .then(({ body: { areValidCredentials } }) => {
                    expect(areValidCredentials).toMatchObject({
                        isValidUsername: true,
                        isValidPassword: true,
                    });
                });
            });
            test("200: when sent a request with an valid username but invalid password, returns the correct object", () => {
                return (0, supertest_1.default)(app_1.default)
                    .post("/api/auth")
                    .send({ username: "ari", password: "iSecretlyHateCheese" })
                    .expect(200)
                    .then(({ body: { areValidCredentials } }) => {
                    expect(areValidCredentials).toMatchObject({
                        isValidUsername: true,
                        isValidPassword: false,
                    });
                });
            });
            test("200: when sent a request with an invalid username and password", () => {
                return (0, supertest_1.default)(app_1.default)
                    .post("/api/auth")
                    .send({
                    username: "music-hater",
                    password: "doesn't even matter, the user doesn't exist",
                })
                    .expect(200)
                    .then(({ body: { areValidCredentials } }) => {
                    expect(areValidCredentials).toMatchObject({
                        isValidUsername: false,
                        isValidPassword: false,
                    });
                });
            });
        });
    });
});
