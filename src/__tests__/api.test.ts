import request from "supertest";
import app from "../app";
import { Music, Review } from "../types/api";
import db from ".././db/postgres/connection";
import { users, music, reviews } from "../db/postgres/data/test-data.json";
import { seed } from "../db/postgres/seed/seed";
import { Response } from "express";

afterAll(() => {
  db.end();
});

beforeEach(() => {
  return seed(users as [], music as [], reviews as []);
});

describe("/api/music", () => {
  describe("GET /api/music", () => {
    test("200: should return an array of object with all music", () => {
      return request(app)
        .get("/api/music")
        .expect(200)
        .then(({ body }) => {
          body.music.forEach((music: Music) => {
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
      return request(app)
        .get("/api/musicincorrect")
        .expect(404)
        .then((Response) => {
          expect(Response.body.msg).toBe("incorrect path - path not found");
        });
    });
  });
  describe("GET /api/music?music_id", () => {
    test("200: should return a single object of music by music_id", () => {
      return request(app)
        .get("/api/music?music_id=1MVqeIAwhD4T44AKVkIfic")
        .expect(200)
        .then(({ body }) => {
          expect(body.music.music_id).toBe("1MVqeIAwhD4T44AKVkIfic");
        });
    });
    test("404: not found", () => {
      return request(app)
        .get("/api/music?music_id=wrongthing")
        .expect(404)
        .then((Response) => {
          expect(Response.body.msg).toBe("not found");
        });
    });
  });
  describe("GET /api/music?artist_ids", () => {
    test("200: should return an array of music object by artist_ids for a particular artist", () => {
      return request(app)
        .get("/api/music?artist_ids=4oLeXFyACqeem2VImYeBFe")
        .expect(200)
        .then(({ body }) => {
          expect(body.music[0].artist_ids).toContain("4oLeXFyACqeem2VImYeBFe");
        });
    });
  });
  describe("GET /api/music?genres", () => {
    test("200: should return an array of music with the same genre", () => {
      return request(app)
        .get("/api/music?genres=country")
        .expect(200)
        .then(({ body }) => {
          expect(body.music[0].genres).toEqual(["Country"]);
        });
    });
  });
  describe("GET /api/music?order", () => {
    test("200: should return an array of music ASC or DESC by release_date if no other query, DESC by default", () => {
      return request(app)
        .get("/api/music?order=ASC")
        .expect(200)
        .then(({ body }) => {
          expect(parseInt(body.music[0].release_date)).toBeLessThan(
            parseInt(body.music[1].release_date)
          );
        });
    });
  });
  describe("GET /api/music?pagination", () => {
    test("200: should return an array of music paginated beyond the default limit of 40", () => {
      return request(app)
        .get("/api/music?p=2")
        .expect(200)
        .then(({ body }) => {
          expect(body.music.length).toBe(10);
        });
    });
  });
  describe("GET /api/music?avg_rating", () => {
    it("200: should return an array of music with avg_rating property when passed true", () => {
      return request(app)
        .get("/api/music?avg_rating=true")
        .expect(200)
        .then(({ body }) => {
          body.music.forEach((song: Music) => {
            expect(song).toHaveProperty("avg_rating");
          });
        });
    });
    it("200: should default to false", () => {
      return request(app)
        .get("/api/music")
        .expect(200)
        .then(({ body }) => {
          body.music.forEach((song: Music) => {
            expect(song).not.toHaveProperty("avg_rating");
          });
        });
    });
    it("200: should chain with other queries", () => {
      return request(app)
        .get("/api/music?music_id=1MVqeIAwhD4T44AKVkIfic&avg_rating=true")
        .expect(200)
        .then(({ body }) => {
          expect(body.music).toHaveProperty("avg_rating");
        });
    });
  });
});

describe("/api/reviews", () => {
  describe("GET /api/reviews", () => {
    it("200: should return an array of review objects", () => {
      return request(app)
        .get("/api/reviews")
        .expect(200)
        .then((response: unknown) => {
          const { body } = response as { body: { reviews: Review[] } };
          body.reviews.forEach((review: any) => {
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
        return request(app)
          .get("/api/reviews/2IGMVunIBsBLtEQyoI1Mu7")
          .expect(200)
          .then((response: unknown) => {
            const { body } = response as { body: { reviews: Review[] } };
            body.reviews.forEach((review: any) => {
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
          review_body:
            "I was expecting the song to be all about escaping being tied up underwater, what a disappointment!",
        };
        return request(app)
          .post("/api/reviews/4OMJGnvZfDvsePyCwRGO7X")
          .send(newReview)
          .expect(201)
          .then(({ body: { review } }) => {
            expect(review.review_id).toEqual(expect.any(Number));
            expect(review.review_title).toBe("Not what I was expecting");
            expect(review.review_body).toBe(
              "I was expecting the song to be all about escaping being tied up underwater, what a disappointment!"
            );
            expect(review.music_id).toBe("4OMJGnvZfDvsePyCwRGO7X");
            expect(review.username).toBe("night_owl_philosopher");
            expect(review.rating).toBe(1);
            expect(review.created_at).toEqual(expect.any(String));
          })
          .then(() => {
            return request(app)
              .get("/api/reviews/4OMJGnvZfDvsePyCwRGO7X")
              .expect(200);
          })
          .then(({ body: { reviews } }) => {
            expect(
              reviews.some(
                (review: any) =>
                  review.review_body ===
                  "I was expecting the song to be all about escaping being tied up underwater, what a disappointment!"
              )
            ).toBe(true);
          });
      });
      test("201: inserts a new review to the db and returns the new review back to the client, with optional fields omitted", () => {
        const ratingOnlyReview = {
          username: "night_owl_philosopher",
          rating: 3,
        };
        return request(app)
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

        return request(app)
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

        return request(app)
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
          review_body:
            "I love to discuss the non-existent - the impossible! I'm the existentialism equivalent of Groucho Marx...",
        };

        return request(app)
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
      await request(app).delete("/api/reviews/1").expect(204);

      return request(app)
        .get("/api/reviews")
        .expect(200)
        .then((response: unknown) => {
          const { body } = response as { body: { reviews: Review[] } };

          body.reviews.every((review) => {
            review.review_id !== 1;
          });
        });
    });
  });
  test("404 responds with an appropriate status and error message when given a non-existent id", () => {
    return request(app)
      .delete("/api/reviews/999")
      .expect(404)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("not found");
      });
  });
  test.only("400 responds with an appropriate status and error message when given an invalid id", () => {
    return request(app)
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
      return request(app)
        .get("/api/search?q=take%20care&type=track")
        .expect(200)

        .then(({ body }) => {
          expect(body).toHaveProperty("tracks");
        });
    });
  });
});
